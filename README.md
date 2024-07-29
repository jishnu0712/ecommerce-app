# E-commerce Full Stack Application

This is a simple e-commerce full stack application built using Next.js for the frontend, Node.js and Express.js for the backend, and PostgreSQL for the database. The application includes functionalities for user authentication, seller and buyer operations, and a responsive design.


## Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL

## Features

- User authentication (sign up and login)
- Seller functionality (add, edit, delete products)
- Buyer functionality (view products, add to cart, remove from cart)
- Responsive design
- Clean code with error handling and validation

## Installation

### Prerequisites

- Node.js
- PostgreSQL

### Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ecommerce-app.git
cd ecommerce-app

2. Install dependecies:

npm install
cd backend
npm install

3. create a .env.local

NEXT_PUBLIC_BASE_URL=http://localhost:8080

4. create a .env inside backend folder

PORT=8080
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=ecommerce_db
JWT_SECRET=your_jwt_secret

5. setup postgresql

npm run create-db
npm run create-tables


6. Start development servers (need two instances)

cd backend
npm start

cd ..
npm run dev


