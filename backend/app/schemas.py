
# Pydantic models (Data validation) [Format Data Came form frontend]

from pydantic import BaseModel
from datetime import datetime

# Schema for creating a new request: Defines what data the API expects from the Frontend
class RequestCreate(BaseModel):
    room_number: str
    service_type: str

# Schema for returning data: Adds database-generated fields like ID and Status
class RequestResponse(RequestCreate):
    id: int
    status: str
    created_at: datetime

    # Pydantic Configuration: Allows the model to read data from SQLAlchemy ORM objects
    class Config:
        from_attributes = True