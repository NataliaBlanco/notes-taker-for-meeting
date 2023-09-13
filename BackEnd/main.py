from fastapi import FastAPI
import users_db



app = FastAPI()

@app.get("/")
async def root():
    return "Hello World"

app.include_router(users_db.router)