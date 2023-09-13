from pydantic import BaseModel


class User(BaseModel):
    id: str = None
    name: str
    email: str
    meeting: str
    date: str

#if we set the "id" to default none then it will work and it won´t give an error when no passing an id in the request body, and it will always generate one with Mondogdb