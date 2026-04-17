
# Create, Read, Update, Delete logics [Database operations]

from sqlalchemy.orm import Session
from . import models, schemas

# Function to create a new hotel service request in the database
def create_hotel_request(db: Session, request: schemas.RequestCreate):
    # 1. Convert Pydantic data into a SQLAlchemy database model instance
    db_item = models.ServiceRequest(**request.model_dump())
    
    # 2. Add the new object to the database session
    db.add(db_item)
    
    # 3. Commit the transaction to save changes permanently to SQLite
    db.commit()
    
    # 4. Refresh the object to retrieve any database-generated data (like the ID)
    db.refresh(db_item)
    
    return db_item

# Function to fetch all service requests from the database
def get_all_requests(db: Session):
    # Performs a SELECT * query on the service_requests table
    return db.query(models.ServiceRequest).all()

def update_request_status(db: Session, request_id: int, new_status: str):
    db_item = db.query(models.ServiceRequest).filter(models.ServiceRequest.id == request_id).first()
    if db_item:
        db_item.status = new_status
        db.commit()
        db.refresh(db_item)
    return db_item  

def get_requests_by_room(db: Session, room_number: str):
    return db.query(models.ServiceRequest).filter(models.ServiceRequest.room_number == room_number).all()      