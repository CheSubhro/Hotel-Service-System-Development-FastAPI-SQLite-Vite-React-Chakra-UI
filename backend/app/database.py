
# SQLite connection and session setup

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database URL: Defines the type of database (SQLite) and the file name/location
SQLALCHEMY_DATABASE_URL = "sqlite:///./hotel_app.db"

# Engine: The core interface that connects SQLAlchemy to the SQLite database
# connect_args={"check_same_thread": False} is required for SQLite to work with FastAPI
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# SessionLocal: A factory for creating new database session objects
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base: The class that our database models (in models.py) will inherit from
Base = declarative_base()

# Dependency: Creates a new database session for each request and closes it afterward
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()