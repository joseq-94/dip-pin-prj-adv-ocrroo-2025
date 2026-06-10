from fastapi import FastAPI
from preliminary.library_basics import CodingVideo


app = FastAPI(title= "dip-pin-prj-adv-ocrroo-2025")


@app.get("/")
async def home():
    return {"message": "It is Running"}