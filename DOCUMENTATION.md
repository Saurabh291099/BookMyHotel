# BookMyHotel - Complete Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Backend Documentation](#backend-documentation)
3. [Frontend Documentation](#frontend-documentation)
4. [API Reference](#api-reference)
5. [Database Schema](#database-schema)
6. [Authentication & Security](#authentication--security)
7. [Environment Variables](#environment-variables)
8. [Deployment Guide](#deployment-guide)
9. [Development Workflow](#development-workflow)
10. [Troubleshooting Guide](#troubleshooting-guide)

---

## Architecture Overview

### System Architecture

BookMyHotel follows a **monorepo structure** with separate frontend and backend applications:

```
┌─────────────────┐         HTTP/REST          ┌─────────────────┐
│                 │ ◄─────────────────────────► │                 │
│   Next.js       │         JWT Tokens          │    NestJS       │
│   Frontend      │                             │    Backend      │
│   (Port 3000)   │                             │   (Port 4000)   │
│                 │                             │                 │
└─────────────────┘                             └─────────────────┘
                                                         │
                                                         │ TypeORM
                                                         ▼
                                                ┌─────────────────┐
                                                │   PostgreSQL    │
                                                │    Database     │
                                                └─────────────────┘
```

### Technology Choices

- **Frontend**: Next.js 15 with App Router for modern React development
- **Backend**: NestJS for scalable, modular backend architecture
- **Database**: PostgreSQL for reliable relational data storage
- **ORM**: TypeORM for type-safe database operations

---

## Backend Documentation

### Project Structure

```
backend/
├── src/
│   ├── main.ts                 # Application entry point
│   ├── app.module.ts           # Root module
│   ├── app.controller.ts       # Root controller
│   ├── app.service.ts          # Root service
│   │
│   ├── auth/                   # Authentication module
│   │   ├── signup/
│   │   │   ├── signup.controller.ts
│   │   │   ├── signup.service.ts
│   │   │   ├── signup.module.ts
│   │   │   └── dto/
│   │   │       └── signup.dto.ts
│   │   └── login/
│   │       ├── login.controller.ts
│   │       ├── login.service.ts
│   │       ├── login.module.ts
│   │       └── dto/
│   │           └── login.dto.ts
│   │
│   ├── hotel/                  # Hotel management module
│   │   ├── hotel.controller.ts
│   │   ├── hotel.service.ts
│   │   ├── hotel.module.ts
│   │   ├── dto/
│   │   │   └── hotel.dto.ts
│   │   └── entities/
│   │       └── hotel.entity.ts
│   │
│   └── entities/               # Shared entities
│       └── user.entity.ts
│
├── test/                       # E2E tests
├── dist/                       # Compiled output
├── package.json
├── tsconfig.json
└── nest-cli.json
```

### Modules

#### App Module (`app.module.ts`)
The root module that imports all feature modules and configures:
- **ConfigModule**: Environment variable management
- **TypeOrmModule**: Database connection and configuration
- **Feature Modules**: SignupModule, LoginModule, HotelModule

#### Authentication Module

**Signup Module**
- **Controller**: `POST /auth/signup`
- **Service**: Handles user registration with password hashing
- **DTO**: Validates user input (name, email, phone, password)
- **Features**:
  - Email uniqueness validation
  - Password hashing with bcrypt (10 salt rounds)
  - Error handling for database issues

**Login Module**
- **Controller**: `POST /auth/login`
- **Service**: Handles user authentication
- **DTO**: Validates login credentials (email, password)
- **Features**:
  - Password verification
  - JWT token generation
  - Returns user data without password

#### Hotel Module

**Hotel Controller**
- `POST /hotels` - Create a new hotel (requires authentication)
- `GET /hotels` - Get hotels by owner ID (requires authentication)

**Hotel Service**
- `createHotel()` - Creates a hotel with owner association
- `getHotelById()` - Retrieves hotels by owner ID

**Hotel Entity**
- Fields: id, ownerId, name, address, city, country, description, rating, imageUrl

### Database Configuration

TypeORM is configured in `app.module.ts` with:
- **Connection Type**: PostgreSQL
- **Synchronization**: Auto-create tables (development only)
- **Entity Discovery**: Automatic via pattern matching
- **Retry Logic**: 3 attempts with 3-second delay

### CORS Configuration

Configured in `main.ts`:
- **Origin**: `http://localhost:3000` (frontend URL)
- **Credentials**: Enabled
- **Methods**: GET, POST, PUT, DELETE
- **Headers**: Content-Type, Authorization

---

## Frontend Documentation

### Project Structure

```
frontend/
├── app/                        # Next.js App Router
│   ├── api/                    # API routes (Next.js API)
│   │   ├── search/
│   │   ├── reservation/
│   │   ├── offers/
│   │   └── rooms/
│   │
│   ├── auth/                   # Authentication pages
│   │   ├── signup/
│   │   ├── login/
│   │   ├── forgot-password/
│   │   └── otp-varify/
│   │
│   ├── dashboard/              # Hotel owner dashboard
│   │   ├── bookings/
│   │   ├── rooms/
│   │   ├── guests/
│   │   ├── reports/
│   │   ├── staff/
│   │   ├── settings/
│   │   └── booking-engine/
│   │
│   ├── hotel/                  # Public hotel pages
│   │   └── [id]/
│   │       ├── page.tsx        # Hotel homepage
│   │       ├── rooms/
│   │       └── room-details/
│   │
│   ├── components/            # Page components
│   ├── Layout/                # Layout components
│   ├── organisms/             # Complex components
│   └── shared/                # Shared utilities
│
├── components/                 # Reusable UI components (shadcn/ui)
├── lib/                       # Utility functions
│   ├── api.ts                 # API client configuration
│   ├── utils.ts               # Helper functions
│   └── seo.ts                 # SEO utilities
│
├── public/                    # Static assets
├── package.json
└── tsconfig.json
```

### Key Features

#### Authentication Flow
1. User signs up → Backend creates account → Returns success
2. User logs in → Backend validates → Returns JWT token
3. Token stored in localStorage/sessionStorage
4. Token included in API requests via Authorization header

#### Hotel Search & Booking
- **Search API**: Filters rooms by dates, guests, room type
- **Reservation API**: Creates booking with guest information
- **Mock Data**: Currently uses mock data (can be replaced with backend integration)

#### Dashboard Features
- Booking management
- Room inventory
- Guest management
- Revenue reports
- Staff management
- Settings configuration

### UI Components

Built with **shadcn/ui** and **Radix UI**:
- Form components (Input, Select, Textarea)
- Data display (Table, Card, Badge)
- Navigation (Tabs, Menu, Breadcrumb)
- Feedback (Toast, Alert, Dialog)
- Layout (Sheet, Drawer, Accordion)

---

## API Reference

### Backend API Endpoints

#### Authentication

**POST /auth/signup**
```json
Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "securePassword123"
}

Response (201):
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**POST /auth/login**
```json
Request Body:
{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "message": "Login successful",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890"
  }
}
```

#### Hotels

**POST /hotels** (Requires Authentication)
```json
Headers:
Authorization: Bearer <jwt_token>

Request Body:
{
  "name": "Grand Hotel",
  "address": "123 Main St",
  "city": "New York",
  "country": "USA",
  "description": "Luxury hotel in the heart of the city",
  "rating": 4.5,
  "imageUrl": "https://example.com/hotel.jpg"
}

Response (201):
{
  "id": 1,
  "ownerId": 1,
  "name": "Grand Hotel",
  ...
}
```

**GET /hotels** (Requires Authentication)
```json
Headers:
Authorization: Bearer <jwt_token>

Response (200):
[
  {
    "id": 1,
    "ownerId": 1,
    "name": "Grand Hotel",
    ...
  }
]
```

### Frontend API Routes (Next.js)

**GET /api/search**
```
Query Parameters:
- checkIn: string (YYYY-MM-DD)
- checkOut: string (YYYY-MM-DD)
- guests: number
- roomType?: string (optional)

Response:
{
  "rooms": [...],
  "totalResults": number
}
```

**POST /api/reservation**
```json
Request Body:
{
  "roomId": "1",
  "checkIn": "2024-01-15",
  "checkOut": "2024-01-20",
  "guests": 2,
  "guestName": "John Doe",
  "guestEmail": "john@example.com",
  "guestPhone": "1234567890",
  "specialRequests": "Late checkout please"
}

Response (201):
{
  "confirmationId": "CONF-123456",
  "status": "confirmed",
  "bookingDate": "2024-01-01T00:00:00.000Z",
  "checkIn": "2024-01-15",
  "checkOut": "2024-01-20",
  "totalPrice": 500,
  "room": {...}
}
```

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Hotels Table
```sql
CREATE TABLE hotels (
  id SERIAL PRIMARY KEY,
  "ownerId" INTEGER NOT NULL REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  description TEXT,
  rating DECIMAL(3,2),
  "imageUrl" VARCHAR(500)
);
```

### Relationships
- **Users → Hotels**: One-to-Many (One user can own multiple hotels)
- **Hotels → Rooms**: One-to-Many (Future implementation)
- **Users → Bookings**: One-to-Many (Future implementation)

---

## Authentication & Security

### JWT Implementation

1. **Token Generation**: On successful login, backend generates JWT with:
   - Payload: `{ sub: user.id, email: user.email }`
   - Expiration: 1 day
   - Secret: From `JWT_SECRET` environment variable

2. **Token Storage**: Frontend stores token in:
   - localStorage (persistent)
   - Or sessionStorage (session-based)

3. **Token Usage**: Include in requests:
   ```
   Authorization: Bearer <token>
   ```

### Password Security

- **Hashing**: bcrypt with 10 salt rounds
- **Storage**: Never store plain text passwords
- **Verification**: bcrypt.compare() for login

### Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **CORS**: Configured for specific origins only
3. **Input Validation**: DTOs with class-validator
4. **Error Handling**: Generic error messages to prevent information leakage
5. **HTTPS**: Use in production (not configured in development)

---

## Environment Variables

### Backend (.env)

```env
# Database Configuration
DB_HOST=localhost              # PostgreSQL host
DB_PORT=5432                  # PostgreSQL port
DB_USERNAME=postgres          # Database username
DB_PASSWORD=your_password     # Database password
DB_DATABASE=bookmyhotel       # Database name
DB_SYNCHRONIZE=true           # Auto-create tables (dev only)
DB_LOGGING=true               # Enable query logging

# Server Configuration
PORT=4000                     # Backend server port

# JWT Configuration
JWT_SECRET=your_secret_key    # Secret for JWT signing (use strong random string)
```

### Frontend

Currently uses hardcoded API URL. To configure:

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## Deployment Guide

### Backend Deployment

1. **Build the application**
   ```bash
   cd backend
   npm run build
   ```

2. **Set production environment variables**
   - Set `DB_SYNCHRONIZE=false`
   - Use production database credentials
   - Set strong `JWT_SECRET`

3. **Run migrations** (if using migrations)
   ```bash
   npm run migration:run
   ```

4. **Start production server**
   ```bash
   npm run start:prod
   ```

### Frontend Deployment

1. **Build the application**
   ```bash
   cd frontend
   npm run build
   ```

2. **Set environment variables**
   - Update API URL to production backend

3. **Start production server**
   ```bash
   npm run start
   ```

### Docker Deployment (Optional)

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: bookmyhotel
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
  
  backend:
    build: ./backend
    ports:
      - "4000:4000"
    depends_on:
      - postgres
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USERNAME: postgres
      DB_PASSWORD: password
      DB_DATABASE: bookmyhotel
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

---

## Development Workflow

### Setting Up Development Environment

1. **Clone and install dependencies**
   ```bash
   git clone <repo>
   cd BookMyHotel
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Set up database**
   - Install PostgreSQL
   - Create database
   - Update `.env` with credentials

3. **Start development servers**
   ```bash
   # Terminal 1: Backend
   cd backend
   npm run start:dev
   
   # Terminal 2: Frontend
   cd frontend
   npm run dev
   ```

### Code Style

- **Backend**: ESLint + Prettier configured
- **Frontend**: TypeScript strict mode enabled
- **Formatting**: Run `npm run format` (backend) before committing

### Git Workflow

1. Create feature branch
2. Make changes
3. Test locally
4. Commit with descriptive messages
5. Push and create PR

---

## Troubleshooting Guide

### Backend Issues

**Error: Cannot use import statement outside a module**
- **Cause**: Incorrect TypeORM import path
- **Solution**: Use `import { Repository } from 'typeorm'` (not `/browser/`)

**Error: Database connection failed**
- **Cause**: PostgreSQL not running or wrong credentials
- **Solution**: 
  - Check PostgreSQL is running: `sudo systemctl status postgresql`
  - Verify credentials in `.env`
  - Test connection: `psql -U username -d database`

**Error: relation "users" does not exist**
- **Cause**: Tables not created
- **Solution**: Set `DB_SYNCHRONIZE=true` or run migrations

**Error: Port 4000 already in use**
- **Solution**: 
  - Change PORT in `.env`
  - Or kill process: `lsof -ti:4000 | xargs kill`

### Frontend Issues

**Error: CORS policy blocked**
- **Cause**: Backend CORS not configured for frontend URL
- **Solution**: Update CORS origin in `backend/src/main.ts`

**Error: API request failed**
- **Cause**: Backend not running or wrong URL
- **Solution**: 
  - Verify backend is running on port 4000
  - Check API URL in `frontend/lib/api.ts`

**Error: Module not found**
- **Cause**: Missing dependencies
- **Solution**: Run `npm install` in frontend directory

### Database Issues

**Error: Database authentication failed**
- **Solution**: Check username and password in `.env`

**Error: Database does not exist**
- **Solution**: Create database: `CREATE DATABASE bookmyhotel;`

**Error: Too many connections**
- **Solution**: Check connection pool settings in TypeORM config

---

## Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## Changelog

### Version 1.0.0
- Initial release
- User authentication (signup/login)
- Hotel management
- Basic booking system
- Dashboard for hotel owners

---

**Last Updated**: 2024

**Maintained by**: Your Team

