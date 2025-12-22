# BookMyHotel - Full Stack Hotel Booking Application

A comprehensive hotel booking and management system built with **Next.js** (Frontend) and **NestJS** (Backend), featuring user authentication, hotel management, room booking, and a complete dashboard for hotel owners.

## 🚀 Features

### User Features
- **User Authentication**: Secure signup and login with JWT tokens
- **Hotel Search**: Search and filter hotels by location, dates, and guest count
- **Room Booking**: Real-time room availability and booking system
- **Hotel Details**: View detailed information about hotels and rooms
- **Special Offers**: Browse and apply promotional offers

### Hotel Owner Features
- **Hotel Management**: Create and manage hotel profiles
- **Dashboard**: Monitor bookings, revenue, and occupancy
- **Booking Engine**: Integrated calendar and booking system
- **Staff Management**: Assign roles and manage team members
- **Reports**: Generate reports on bookings and revenue
- **Settings**: Customize hotel information and preferences

### Admin Features
- **Super Admin Panel**: System-wide administration
- **User Management**: Manage all users and hotels
- **System Monitoring**: Track system performance and usage

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.5.4 (React 19.1.0)
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, shadcn/ui
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend
- **Framework**: NestJS 11.x
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: class-validator, class-transformer
- **CORS**: Enabled for frontend communication

## 📁 Project Structure

```
BookMyHotel/
├── frontend/                 # Next.js frontend application
│   ├── app/                  # Next.js app directory
│   │   ├── api/             # API routes (search, booking, offers)
│   │   ├── auth/            # Authentication pages
│   │   ├── dashboard/       # Hotel owner dashboard
│   │   ├── hotel/           # Hotel public pages
│   │   └── ...
│   ├── components/          # Reusable UI components
│   └── lib/                 # Utility functions
│
├── backend/                  # NestJS backend application
│   ├── src/
│   │   ├── auth/            # Authentication module
│   │   │   ├── signup/      # User registration
│   │   │   └── login/       # User login
│   │   ├── hotel/           # Hotel management module
│   │   ├── entities/        # Database entities
│   │   └── ...
│   └── dist/                # Compiled JavaScript
│
└── README.md                # This file
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BookMyHotel
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

#### Backend Configuration

1. Create a `.env` file in the `backend/` directory:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   DB_DATABASE=bookmyhotel
   DB_SYNCHRONIZE=true
   DB_LOGGING=true

   # Server Configuration
   PORT=4000

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here
   ```

2. **Create the Database**
   ```bash
   # Connect to PostgreSQL
   psql -U postgres

   # Create database
   CREATE DATABASE bookmyhotel;
   \q
   ```

#### Frontend Configuration

The frontend is configured to connect to `http://localhost:4000` by default. Update the API base URL in `frontend/lib/api.ts` if needed.

### Running the Application

#### Start Backend Server
```bash
cd backend
npm run start:dev
```
Backend will run on `http://localhost:4000`

#### Start Frontend Server
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login

### Hotels
- `POST /hotels` - Create a new hotel (requires authentication)
- `GET /hotels` - Get hotels by owner ID (requires authentication)

### Frontend API Routes (Next.js)
- `GET /api/search` - Search for available rooms
- `POST /api/reservation` - Create a reservation
- `GET /api/offers` - Get special offers
- `GET /api/rooms` - Get room listings

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. After successful login, include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 🗄️ Database Schema

### Users Table
- `id` (Primary Key)
- `name`
- `email` (Unique)
- `phone`
- `password` (Hashed with bcrypt)
- `createdAt`
- `updatedAt`

### Hotels Table
- `id` (Primary Key)
- `ownerId` (Foreign Key to Users)
- `name`
- `address`
- `city`
- `country`
- `description`
- `rating`
- `imageUrl`

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm run test
npm run test:e2e
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## 🏗️ Building for Production

### Backend
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend
```bash
cd frontend
npm run build
npm run start
```

## 📝 Environment Variables

See `DOCUMENTATION.md` for detailed environment variable documentation.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and unlicensed.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check database credentials in `.env`
   - Ensure database exists

2. **CORS Errors**
   - Verify backend CORS configuration in `main.ts`
   - Check frontend URL matches CORS origin

3. **TypeORM Import Errors**
   - Ensure you're using `import { Repository } from 'typeorm'` (not `/browser/`)
   - Verify TypeORM module is properly registered in feature modules

4. **Port Already in Use**
   - Change PORT in `.env` (backend) or use different port for frontend
   - Kill process using the port: `lsof -ti:4000 | xargs kill`

## 📚 Additional Documentation

For detailed documentation, see `DOCUMENTATION.md`

## 👥 Authors

- Your Name/Team

## 🙏 Acknowledgments

- NestJS team for the excellent framework
- Next.js team for the amazing React framework
- All open-source contributors

---

**Note**: This is a full-stack application. Make sure both backend and frontend servers are running for the application to work properly.
