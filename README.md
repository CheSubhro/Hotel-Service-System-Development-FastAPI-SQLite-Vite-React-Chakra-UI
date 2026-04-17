# 🏨 Hotel Service Management System (QR-Based)

A modern, real-time Full-Stack application designed to digitize hotel room services. Guests can scan a universal QR code to request services like cleaning, food, or emergency help, while staff can manage these requests through a prioritized dashboard.

---

## 🌟 Key Features

- **Guest Portal**: A mobile-responsive form for guests to submit requests instantly.
- **Staff Dashboard**: A private URL (`/staff`) for hotel employees to monitor and manage tasks.
- **Smart Priority Logic**: Automatically categorizes requests (e.g., Emergency = **High**, Laundry = **Low**).
- **Real-Time Sync**: Automatically refreshes the staff list every 5 seconds to show new requests.
- **Universal QR Code Support**: Designed for a single QR code across all rooms; guests simply enter their room number.
- **Time-Ago Tracking**: Shows exactly when a request was made (e.g., "5 mins ago") to ensure SLA compliance.

---

<img width="1115" height="641" alt="localhost_5173_staff" src="https://github.com/user-attachments/assets/1eb54879-9a5e-45f2-9a8c-b0c416cc0e0a" />
<img width="1115" height="641" alt="localhost_5173_ (10)" src="https://github.com/user-attachments/assets/9243e105-0a7f-4a7f-8431-eec412a005c4" />
<img width="1100" height="772" alt="127 0 0 1_8000_docs (2)" src="https://github.com/user-attachments/assets/d53168f0-301c-4d17-9817-2b2aba7296bc" />
<img width="1115" height="641" alt="localhost_5173_ (9)" src="https://github.com/user-attachments/assets/6c59e44f-0638-4692-b1fc-34f41cc90568" />


## 🛠️ Tech Stack

**Backend:**
- [FastAPI](https://fastapi.tiangolo.com/) - High-performance Python framework.
- [SQLAlchemy](https://www.sqlalchemy.org/) - Database ORM.
- [SQLite](https://www.sqlite.org/) - Lightweight relational database.

**Frontend:**
- [React (Vite)](https://vitejs.dev/) - Fast and modern frontend tooling.
- [Chakra UI](https://v2.chakra-ui.com/) - Component library for a polished UI.
- [Axios](https://axios-http.com/) - For handling API requests.
- [React Router](https://reactrouter.com/) - For handling navigation between Guest and Staff views.

---

## 🚀 Getting Started

###  Backend Setup
```bash
cd backend
pip install fastapi uvicorn sqlalchemy
uvicorn app.main:app --reload

The backend will run on http://127.0.0.1:8000

### Frontend Setup
cd frontend
npm install
npm run dev -- --host

The frontend will run on http://localhost:5173 (Use your Local IP for mobile testing)

Project Architecture
Guest Scanning: Guest scans the QR code and lands on the root URL (/).

Request Submission: Data is validated by Pydantic and stored in SQLite.

Staff Processing: Staff accesses /staff, sees the prioritized list, and marks tasks as "Completed" which updates the database in real-time

API Documentation
FastAPI provides an automatic interactive swagger documentation:

URL: http://127.0.0.1:8000/docs
