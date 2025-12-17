# Database Setup and Error Fix Guide

## Issues Found and Fixed

### 1. ✅ CORS Configuration Error (FIXED)
- **Problem**: `Credential:true` should be `credentials:true` (lowercase 'c')
- **Status**: Fixed in `src/main.ts`

### 2. ⚠️ Database Connection Issues

The signup endpoint is failing because of database connection problems. Here's what you need to do:

#### Step 1: Update Database Credentials
Edit the `.env` file in the backend directory and update these values with your actual PostgreSQL credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_actual_password_here  # ⚠️ UPDATE THIS!
DB_DATABASE=bookmyhotel
```

#### Step 2: Create the Database (if it doesn't exist)
Connect to PostgreSQL and create the database:

```bash
psql -U postgres
```

Then run:
```sql
CREATE DATABASE bookmyhotel;
\q
```

#### Step 3: Enable Table Auto-Creation (Temporary)
To automatically create the `users` table, temporarily set in `.env`:

```env
DB_SYNCHRONIZE=true
```

**⚠️ Warning**: Set this back to `false` in production!

#### Step 4: Restart the Backend Server
After updating the `.env` file, restart your NestJS server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run start:dev
```

## Testing the Connection

After fixing the above, test the signup endpoint:

```bash
# The endpoint should work at:
POST http://localhost:4000/auth/signup
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "1234567890",
  "password": "test123"
}
```

## Common Error Messages

- **"Database connection failed"**: Check if PostgreSQL is running and credentials are correct
- **"Database authentication failed"**: Wrong username or password
- **"Database does not exist"**: Create the database first (see Step 2)
- **"relation 'users' does not exist"**: Enable `DB_SYNCHRONIZE=true` or create the table manually

## Manual Table Creation (Alternative)

If you prefer to create the table manually instead of using `synchronize`:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

