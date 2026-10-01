from pydantic import BaseModel

class User(BaseModel):
    name: str
    age: int

def insert_data(user: User):
    print(user.name)
    print(user.age)  

user1=User(name='Ajay',age=30)
insert_data(user1)
    