from sqlalchemy.orm import Session
from . import models, schemas
import logging

def get_member(db: Session, member_id: int):
    member = db.query(models.Member).filter(models.Member.id == member_id).first()
    logging.info(f"Retrieved member: {member}")
    return member

def get_members(db: Session, skip: int = 0, limit: int = 10):
    members = db.query(models.Member).offset(skip).limit(limit).all()
    logging.info(f"Retrieved members: {members}")
    return members

def create_member(db: Session, member: schemas.MemberCreate):
    try:
        db_member = models.Member(
            name=member.name, 
            age=member.age, 
            contact=member.contact, 
            category=member.category, 
            level=member.level
        )
        db.add(db_member)
        db.commit()
        db.refresh(db_member)
        logging.info(f"Created member: {db_member}")
        return db_member
    except Exception as e:
        logging.error(f"Error creating member: {e}")
        db.rollback()
        raise
