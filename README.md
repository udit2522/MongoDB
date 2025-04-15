# Employee Management API with MongoDB

A complete REST API for employee CRUD operations using Node.js and MongoDB.

## 📦 Features
- Create, Read, Update, Delete employees
- MongoDB database integration
- RESTful endpoints
- Error handling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 6+ (running locally)
- Postman (for testing)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/udit2522/MongoDB.git
   cd MongoDB
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your MongoDB URI:
   ```env
   MONGODB_URI=mongodb://localhost:27017/employee_db
   ```

4. Start the server:
   ```bash
   node server.js
   ```

## 📚 API Documentation

| Method | Endpoint          | Description           | Body Required |
|--------|-------------------|-----------------------|---------------|
| POST   | /employees        | Create new employee   | Yes           |
| GET    | /employees        | Get all employees     | No            |
| GET    | /employees/:id    | Get single employee   | No            |
| PUT    | /employees/:id    | Update employee       | Yes           |
| DELETE | /employees/:id    | Delete employee       | No            |

## 🧪 Testing with Postman
1. Import the [Postman Collection](docs/postman_collection.json)
2. Set environment variables in Postman:
   - `base_url`: `http://localhost:3000`

## 📂 Project Structure
```
MongoDB/
├── server.js          # Main application
├── .env.example       # Environment template
├── package.json
└── README.md          # This documentation
```