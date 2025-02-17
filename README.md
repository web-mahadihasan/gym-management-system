Here's your complete `README.md` file in Markdown format:  

```markdown
# Gym Management System Backend

## Project Overview
The **Gym Management System Backend** is designed to handle gym operations, including user authentication, class scheduling, and booking functionalities. It provides RESTful API endpoints to facilitate seamless interaction between admins, trainers, and trainees while enforcing business rules for effective management.

## Relation Diagram
![Gym Management System Relation Diagram](https://example.com/gym-management-relation-diagram.png)  
*Note: Replace the above URL with the actual link to your relation diagram image.*

## Technology Stack
The project is built using the following technologies:
- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JSON Web Tokens (JWT)** for authentication
- **bcryptjs** for password hashing
- **date-fns** for date manipulation

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### User Routes
- `GET /api/user` - Get current user profile
- `PUT /api/user/update-profile` - Update user profile

### Admin Routes (Admin only)
- `POST /api/admin/create-trainer` - Create a new trainer
- `GET /api/admin/trainers` - Get all trainers
- `POST /api/admin/create-class-schedule` - Create a new class schedule

### Trainer Routes
- `GET /api/trainer/schedules` - Get trainer's schedules

### Trainee Routes
- `GET /api/trainee/class-schedules` - Get available class schedules
- `POST /api/trainee/book-class` - Book a class
- `DELETE /api/trainee/cancel-booking/:bookingId` - Cancel a booking

## Database Schema

### User Model
```typescript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "trainer", "trainee"], required: true },
}
```

### Class Schedule Model
```typescript
{
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  title: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  maxCapacity: { type: Number, default: 10 },
  currentBookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}
```

### Booking Model
```typescript
{
  trainee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  classSchedule: { type: mongoose.Schema.Types.ObjectId, ref: "ClassSchedule", required: true },
}
```

## Admin Credentials
Use the following credentials to log in as an admin:
```
Email: mahadi.admin@gmail.com
Password: Mm123456
```
```
Trainer 
Email: trainer@gmail.com
Password: Mm123456
```
*Note: Update with actual credentials.*

## Instructions to Run Locally

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14 or later)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn**

### Setup and Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/web-mahadihasan/gym-management-system.git
   ```
2. Navigate into the project directory:
   ```sh
   cd gym-management-system
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and configure environment variables:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
5. Start the development server:
   ```sh
   npm start
   ```
6. The backend will be running on:
   ```
   http://localhost:3000
   ```

## Dependencies
```json
"dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "date-fns": "^4.1.0",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.0.12"
}
```

## Live Hosting Link
🔗 **Live Project:** *[https://gym-management-server-bd.vercel.app/]*

## License
This project is licensed under the **MIT License**.

---

### 📌 Additional Notes:
- Ensure to update environment variables in the `.env` file.
- Modify the `Admin Credentials` section with actual credentials.
- If using a cloud database (MongoDB Atlas), replace `MONGO_URI` with the correct connection string.
```
