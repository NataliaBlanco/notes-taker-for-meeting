from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from db.models.user  import User
from db.schema.user import user_schema,users_schema
from db.client import db_client
from bson import ObjectId



router = APIRouter(prefix="/userdb",tags=["userdb"],responses={status.HTTP_404_NOT_FOUND:{"message": "No encontrado"}})


@router.get("/", response_model=list[User]) #http://127.0.0.1:8000/userdb
async def users():
    return users_schema(db_client.local.users.find())

# Path

@router.get("/{id}")  #http://127.0.0.1:8000/userdb/64f610e7cbce3a181a6e5d3d
async def user(id: str):
        return search_user("_id", ObjectId(id))


@router.get("/") #query     #http://127.0.0.1:8000/userdb/?id=64f610e7cbce3a181a6e5d3d
async def user(id: str):
    return search_user("_id", ObjectId(id))


def search_user(field: str, key): 
    try:
        user = db_client.local.users.find_one({field: key})
        return User(**user_schema(user))
    except: 
        return {"Error":"No se ha encontrado usuario"}
    
#Este search_user:by_email era la función original dónde en el metodo post, se hacía primero una búsqueda de el usuario por mail.

@router.post("/", response_model=User, status_code=status.HTTP_201_CREATED)
async def user(user: User):
    if type(search_user("email",user.email)) == User:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="El usuario ya existe")
    user_dict = dict(user)
    del user_dict["id"]
    id = db_client.local.users.insert_one(user_dict).inserted_id

    new_user = user_schema(db_client.local.users.find_one({"_id":id}))
    
    return User(**new_user)


@router.put ("/",  response_model=User, status_code=status.HTTP_200_OK)  
async def user(user:User):
   user_dict = dict(user)
   del user_dict["id"]
   try:db_client.local.users.find_one_and_replace({"_id": ObjectId(user.id)},user_dict)

   except:
    return {"Error":"No se ha encontrado usuario"}
   
   return search_user("_id",ObjectId(user.id))
 

@router.delete ("/{id}",status_code=status.HTTP_204_NO_CONTENT) #http://127.0.0.1:8000/userdb/?id=64f610e7cbce3a181a6e5d3d
async def user(id:str):
    found = db_client.local.users.find_one_and_delete({"_id": ObjectId(id)})
    if not found:
        return {"Error":"No se ha encontrado usuario"}





