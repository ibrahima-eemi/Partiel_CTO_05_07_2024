from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import models, schemas, crud, database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/members/", response_model=schemas.Member)
def create_member(member: schemas.MemberCreate, db: Session = Depends(get_db)):
    return crud.create_member(db=db, member=member)

@app.get("/members/", response_model=list[schemas.Member])
def read_members(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_members(db, skip=skip, limit=limit)
