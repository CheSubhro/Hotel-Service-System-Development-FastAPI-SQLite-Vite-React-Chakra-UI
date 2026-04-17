
# SQLAlchemy database models [For Database table define]

from sqlalchemy import Column, Integer, String, DateTime
from .database import Base
from datetime import datetime

# Database Model: This class defines how the "service_requests" table will look in SQLite
class ServiceRequest(Base):
    # Name of the table inside the SQLite database
    __tablename__ = "service_requests"

    # Unique ID for each request; primary_key ensures no two requests have the same ID
    id = Column(Integer, primary_key=True, index=True)
    
    # Room number of the guest; index=True makes searching by room number faster
    room_number = Column(String, index=True)
    
    # Type of service requested (e.g., "Cleaning", "Laundry")
    service_type = Column(String) 
    
    # Status of the request; defaults to "Pending" when a new request is created
    status = Column(String, default="Pending")

    # Timestamp: Records the exact time when the request was made
    # Note: Using datetime.utcnow ensures a standard time format
    created_at = Column(DateTime, default=datetime.utcnow)