from sqlalchemy import Column, Integer, String
from .database import Base

class Member(Base):
    __tablename__ = "members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    age = Column(Integer)
    contact = Column(String)
    category = Column(String)
    level = Column(String)
