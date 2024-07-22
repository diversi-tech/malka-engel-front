
Event Design 
Introduction
Welcome to the EventDesign E-commerce Platform, a sophisticated online marketplace for purchasing graphic design products tailored for events, such as banners, advertisements, and more. Our platform offers a seamless and user-friendly experience, ensuring that both customers and administrators have all the tools they need for efficient and enjoyable interactions.

Features
User Registration: Easy sign-up and login process for customers.
Product Browsing: Browse a wide range of graphic design products.
Order Placement: Simple and secure process for placing orders.
Automatic Email Notifications: Site manager receives automatic notifications upon order placement.
Order Management: Administrators can manage all orders efficiently.
Product Management: Easy management of products, including adding, updating, and deleting items.
Category Management: Organize products into categories for better browsing experience.
High-Quality Design: The website features a sleek, modern design with many cool features.
Technologies
Frontend: HTML, CSS, JavaScript
Backend: C# with ADO.NET
Database: SQL Server
Frameworks: ASP.NET
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/eventdesign-platform.git
cd eventdesign-platform
Set up the database:

Create a new SQL Server database.
Run the provided SQL scripts in the /db directory to set up the necessary tables and seed data.
Set up environment variables:
Create a .env file in the root directory and add the following:

env
Copy code
DB_CONNECTION_STRING=your_database_connection_string
Install dependencies:

bash
Copy code
npm install
Run the backend server:

bash
Copy code
dotnet run
Run the frontend server:

bash
Copy code
npm start
API Endpoints
Users
POST /api/users/register - Register a new user.
POST /api/users/login - Login a user.
Products
GET /api/products - Retrieve all products.
POST /api/products - Add a new product.
GET /api/products/:id - Retrieve a specific product by ID.
PUT /api/products/:id - Update a specific product by ID.
DELETE /api/products/:id - Delete a specific product by ID.
Orders
GET /api/orders - Retrieve all orders.
POST /api/orders - Create a new order.
GET /api/orders/:id - Retrieve a specific order by ID.
PUT /api/orders/:id - Update a specific order by ID.
DELETE /api/orders/:id - Delete a specific order by ID.
Categories
GET /api/categories - Retrieve all categories.
POST /api/categories - Add a new category.
GET /api/categories/:id - Retrieve a specific category by ID.
PUT /api/categories/:id - Update a specific category by ID.
DELETE /api/categories/:id - Delete a specific category by ID.
Contributing
We welcome contributions to the EventDesign E-commerce Platform! If you'd like to contribute, please fork the repository, create a new branch, and submit a pull request.

Fork the repository.
Create a new branch: git checkout -b feature-branch-name
Make your changes and commit them: git commit -m 'Add new feature'
Push to the branch: git push origin feature-branch-name
Submit a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For any inquiries or questions, please contact us at d32193412.com.

