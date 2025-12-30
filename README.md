# Hopelates 🍱

Hopelates is a food aid management system that supports donation handling, inventory tracking, aid applications, and food package distribution to beneficiaries.  
The system is designed to help staff efficiently manage operations while ensuring transparency between donors, staff, and beneficiaries.

This project is developed collaboratively by a student team, with each member responsible for different system modules and database components based on the ERD design.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- SweetAlert2

### Backend
- Node.js
- Express.js
- RESTful API

### Database & Tools
- PostgreSQL
- MySQL
- MariaDB
- DBeaver (Database Management)
- ZeroTier (Private Network Connectivity)

---

## 🏗️ System Architecture

- Frontend communicates with backend via RESTful APIs
- Backend handles business logic and database operations
- Multiple databases are used to support modular development
- Databases are accessed and managed using DBeaver
- ZeroTier is used to enable secure private network access between team members

---

## 🗄️ Database Strategy

The system uses a multi-database approach to support collaborative development:

- PostgreSQL  
  Core application and staff-related modules

- MySQL  
  Donation and payment-related modules

- MariaDB  
  Inventory, donation package, and distribution modules

Each database is maintained independently and integrated at the application layer.

---

## ✨ Core Modules

- User Management (Staff, Donor, Beneficiary)
- Application Management
- Donation & Payment Management
- Donation Package Management
- Inventory Management
- Distribution Management

---

## 🔄 System Workflow

1. Beneficiaries submit applications
2. Staff review and verify applications
3. Donors contribute donations and payments
4. Staff manage inventory and donation packages
5. Approved beneficiaries receive food distributions

---

## 🔌 Backend API (Current Scope)

GET /api/application  
Retrieve all applications  

PUT /api/application/:id  
Approve or reject an application  

Additional APIs will be implemented as other modules are integrated.

---

## 🧩 Setup & Installation (After Cloning)

Follow the steps below after cloning the repository:

### 1️⃣ Clone the Repository
git clone https://github.com/your-username/hopelates.git  
cd hopelates

### 2️⃣ Install Dependencies

Backend
cd server  
npm install  

Frontend
cd ..  
npm install  

---

### 3️⃣ Database Setup

- Install PostgreSQL, MySQL, and MariaDB
- Create the required databases based on the ERD design
- Import table structures provided by each module owner
- Use **DBeaver** to manage and verify database connections

Each team member may run a local database instance depending on the module they are working on.

---

### 4️⃣ Network Setup (Optional – Team Collaboration)

- Install and configure **ZeroTier**
- Join the private ZeroTier network provided by the team
- Ensure database and backend services are reachable within the private network

---

### 5️⃣ Environment Configuration

- Create a `.env` file inside the `server` directory
- Configure database connection details for each database

Example:
PORT=5000  
DB_HOST=localhost  
DB_USER=your_username  
DB_PASSWORD=your_password  

---

### 6️⃣ Run the Application

Backend
cd server  
npm start  

Frontend
cd ..  
npm run dev  

Backend runs at:  
http://localhost:5000  

Frontend runs at:  
http://localhost:5173  

---

## 👤 Staff Module Features

Staff users can:
- View all applications
- Approve or reject applications
- Manage donation packages
- Track inventory stock
- Handle beneficiary distributions

---

## 📌 Future Improvements

- Full API integration across all databases
- Authentication and authorization
- Role-based access control (Admin / Staff / Donor)
- Inventory expiry and low-stock alerts
- Reporting and PDF export
- Containerization and cloud deployment
