from pydantic import BaseModel

class MemberBase(BaseModel):
    name: str
    age: int
    contact: str
    category: str
    level: str

class MemberCreate(MemberBase):
    pass

class Member(MemberBase):
    id: int

    class Config:
        from_attributes = True
