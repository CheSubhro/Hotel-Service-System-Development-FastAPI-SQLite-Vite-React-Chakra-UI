
# Entry point (FastAPI app instance)

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import engine, Base, get_db
from . import crud, schemas, models
from fastapi.middleware.cors import CORSMiddleware

# Initialize Database: Automatically creates the database file and tables based on models
Base.metadata.create_all(bind=engine)

# App Instance: Main entry point for the FastAPI application
app = FastAPI(title="Hotel Service API")

# Allow React (localhost:5173) to talk to this Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # React er default port
    allow_credentials=True,
    allow_methods=["*"], # GET, POST, etc. shob allow korbe
    allow_headers=["*"],
)

# POST Endpoint: To create a new service request (Receives data from Frontend)
@app.post("/requests/", response_model=schemas.RequestResponse)
def create_request(request: schemas.RequestCreate, db: Session = Depends(get_db)):
    """
    Takes room number and service type from the request body and saves it to SQLite.
    """
    return crud.create_hotel_request(db=db, request=request)

# GET Endpoint: To fetch all service requests (For Admin or Staff view)
@app.get("/requests/", response_model=list[schemas.RequestResponse])
def read_requests(db: Session = Depends(get_db)):
    """
    Fetches all hotel service requests from the database and returns them as a list.
    """
    return crud.get_all_requests(db)

@app.patch("/requests/{request_id}", response_model=schemas.RequestResponse)
def update_status(request_id: int, status: str, db: Session = Depends(get_db)):
    updated_item = crud.update_request_status(db, request_id, status)
    if not updated_item:
        raise HTTPException(status_code=404, detail="Request not found")
    return updated_item    