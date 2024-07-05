# backend/main.py
from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, crud, database
from .curl_poster import post_member
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Sports Association API"}

@app.post("/members/", response_model=schemas.Member)
def create_member(member: schemas.MemberCreate, db: Session = Depends(get_db)):
    db_member = crud.create_member(db=db, member=member)
    post_member(member.dict())
    return db_member

@app.options("/members/")
async def options_members():
    return {}

@app.get("/members/", response_model=list[schemas.Member])
def read_members(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_members(db, skip=skip, limit=limit)
