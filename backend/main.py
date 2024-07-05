from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from mangum import Mangum
from . import models, schemas, crud, database
import logging

logging.basicConfig(level=logging.INFO)

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    # Ajoutez d'autres origines si nécessaire
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    logging.info(f"Incoming request: {request.method} {request.url}")
    response = await call_next(request)
    logging.info(f"Response status code: {response.status_code}")
    return response

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Sports Association API"}

@app.get("/favicon.ico")
async def favicon():
    return {"message": "No favicon set"}

@app.post("/members/", response_model=schemas.Member)
def create_member(member: schemas.MemberCreate, db: Session = Depends(get_db)):
    logging.info(f"Received member: {member}")
    try:
        created_member = crud.create_member(db=db, member=member)
        logging.info(f"Created member: {created_member}")
        return created_member
    except Exception as e:
        logging.error(f"Error creating member: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.get("/members/", response_model=list[schemas.Member])
def read_members(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    members = crud.get_members(db, skip=skip, limit=limit)
    logging.info(f"Fetched members: {[member.name for member in members]}")
    return members

handler = Mangum(app)
