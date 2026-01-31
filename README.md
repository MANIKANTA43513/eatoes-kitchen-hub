🍽️ Restaurant Admin Dashboard
Eatoes Intern – Technical Assessment
A full-stack Restaurant Admin Dashboard built using the MERN stack that allows restaurant owners to manage menu items, track orders, and monitor inventory in real time.
This project demonstrates real-world backend API design, efficient MongoDB querying, and modern React best practices.
🚀 Project Overview
The Restaurant Admin Dashboard is designed for restaurant owners and staff to:
Manage menu items (Create, Read, Update, Delete)
Control item availability (inventory tracking)
View and update customer orders
Search and filter menu items efficiently
Handle real-world UI challenges like debounced search and optimistic updates
This project was built as part of the Eatoes Intern Technical Assessment and focuses on clean architecture, performance optimization, and production readiness.
🛠️ Tech Stack
Frontend
React 18+
Axios
Tailwind CSS
Lucide Icons
Backend
Node.js
Express.js
Mongoose
Database
MongoDB Atlas
Deployment
Frontend: Netlify
Backend: Render
Database: MongoDB Atlas (Free Tier)
✨ Features Implemented
🔹 Menu Management
View all menu items in a responsive grid
Add, edit, and delete menu items
Toggle availability (In Stock / Out of Stock)
Filter by category and availability
Search by name or ingredients with debouncing
🔹 Orders Dashboard
View all customer orders
Status badges (Pending, Preparing, Ready, Delivered, Cancelled)
Filter orders by status
Pagination support
Update order status with dropdown
View detailed order items
🔹 Performance & UX Enhancements
Debounced search (300ms delay)
Optimistic UI updates
Loading states and error handling
Reusable components and custom hooks
📁 Project Structure
Copy code

root/
├── server/
│   ├── config/             # Database configuration
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── controllers/        # Business logic
│   ├── scripts/            # Seed scripts
│   ├── .env.example        # Environment variables template
│   └── server.js           # Entry point
└── client/
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── hooks/          # Custom hooks
    │   ├── context/        # Global state
    │   ├── pages/          # Main pages
    │   └── App.jsx
    └── public/
🧩 Database Schema
MenuItem Collection
name (String, required, indexed)
description (String)
category (Enum: Appetizer, Main Course, Dessert, Beverage)
price (Number, required)
ingredients (Array of Strings)
isAvailable (Boolean, default: true)
preparationTime (Number)
imageUrl (String)
createdAt, updatedAt
Order Collection
orderNumber (String, unique)
items (Menu item reference + quantity)
totalAmount (Number)
status (Enum)
customerName (String)
tableNumber (Number)
createdAt, updatedAt
🔗 API Endpoints
Menu APIs
Method
Endpoint
Description
GET
/api/menu
Get all menu items
GET
/api/menu/search?q=
Search menu items
GET
/api/menu/:id
Get single item
POST
/api/menu
Create item
PUT
/api/menu/:id
Update item
DELETE
/api/menu/:id
Delete item
PATCH
/api/menu/:id/availability
Toggle availability
Order APIs
Method
Endpoint
Description
GET
/api/orders
Get all orders (pagination)
GET
/api/orders/:id
Get single order
POST
/api/orders
Create order
PATCH
/api/orders/:id/status
Update order status
⚙️ Environment Variables
Backend (.env)
Copy code

PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=production
Frontend (.env)
Copy code

REACT_APP_API_URL=https://your-backend.onrender.com
🔍 Key Technical Challenges Solved
1️⃣ Debounced Search
Implemented custom useDebounce hook
API calls triggered only after 300ms inactivity
Handles empty input and special characters
2️⃣ Optimistic UI Updates
Availability toggle updates UI instantly
API runs in background
Rollback with error notification if request fails
3️⃣ MongoDB Aggregation (Optional)
Top 5 selling menu items
Uses $unwind, $group, $lookup, $sort, $limit
🌱 Seed Data
15+ menu items across all categories
10+ orders with different statuses
Seed script included for easy testing
🚀 Deployment
Backend (Render)
Connected GitHub repository
Environment variables configured
CORS enabled for frontend access
Frontend (Netlify)
Production build deployed
SPA routing configured
Backend URL connected via environment variable
🧪 How to Run Locally
Backend
Copy code
Bash
cd server
npm install
npm run dev
Frontend
Copy code
Bash
cd client
npm install
npm start
🧠 Challenges Faced & Solutions
Search performance: Solved using debouncing and MongoDB text indexes
State consistency: Used optimistic updates with rollback logic
Scalability: Clean separation of controllers, routes, and models
Deployment issues: Handled CORS and environment variables correctly
📸 Screenshots / Demo
(Add screenshots or GIFs here showing Menu Management and Orders Dashboard)
✅ Conclusion
This project demonstrates my ability to design scalable APIs, write efficient MongoDB queries, and build clean, user-friendly React applications.
It reflects real-world restaurant management workflows and production-ready deployment practices.
