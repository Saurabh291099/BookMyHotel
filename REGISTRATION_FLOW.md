# Complete User Registration & Dashboard/Hotel Website Creation Flow

## Overview
This guide explains the complete flow from user registration to accessing the dashboard and hotel website.

---

## **Complete Flow (Step-by-Step)**

### **1. User Signs Up** 📝
- User fills signup form with: Name, Email, Phone, Password
- Frontend (`/app/auth/signup/page.tsx`) sends data to backend

### **2. Backend Creates User & Default Hotel** ✅
**File:** `/backend/src/auth/signup/signup.service.ts`
- Creates User entity with hashed password
- **NEW:** Automatically creates a default Hotel entity with:
  - `ownerId`: User's ID
  - `name`: "{User's Name}'s Hotel"
  - Other fields: empty (to be filled later)
- Returns: `{ hotelId, user, message }`

### **3. Frontend Redirects to Hotel Setup** 🏨
**File:** `/frontend/app/auth/signup/page.tsx`
- Receives `hotelId` from backend response
- Redirects to: `/onboarding/setup-hotel/{hotelId}`

### **4. User Completes Hotel Setup** 📋
**File:** `/frontend/app/onboarding/setup-hotel/[id]/page.tsx`
- User fills hotel details:
  - Hotel Name
  - Address
  - City
  - Country
  - Description
  - Logo (optional)
- Sends PATCH request to: `PATCH /hotels/{hotelId}`

### **5. Backend Updates Hotel Information** 💾
**File:** `/backend/src/hotel/hotel.controller.ts` & `hotel.service.ts`
- **NEW ENDPOINT:** `PATCH /hotels/{id}`
- Updates hotel with all details provided by user
- Returns updated hotel object

### **6. Frontend Redirects to Dashboard** 📊
- After successful hotel setup
- Redirects to: `/dashboard/home/{hotelId}`
- User now has access to full dashboard

### **7. Login Flow** 🔐
**File:** `/backend/src/auth/login/login.service.ts`
- User logs in with email & password
- **NEW:** Backend returns `hotelId` in response
- Frontend stores token & hotel ID in localStorage
- Redirects to dashboard: `/dashboard/home/{hotelId}`

---

## **File Changes Summary**

### **Backend Changes:**

1. **`src/auth/signup/signup.service.ts`**
   - ✅ Import Hotel repository
   - ✅ Create default hotel on signup

2. **`src/auth/signup/signup.module.ts`**
   - ✅ Add Hotel to TypeOrmModule.forFeature()

3. **`src/hotel/hotel.controller.ts`**
   - ✅ Add PATCH method for `updateHotel`
   - ✅ Add GET method for `getHotelById`
   - ✅ Remove JwtAuthGuard from class level

4. **`src/hotel/hotel.service.ts`**
   - ✅ Add `updateHotel()` method
   - ✅ Add `getHotelByIdOnly()` method

5. **`src/auth/login/login.service.ts`**
   - ✅ Import Hotel repository
   - ✅ Fetch & return hotelId in response

6. **`src/auth/login/login.module.ts`**
   - ✅ Add Hotel to TypeOrmModule.forFeature()

---

### **Frontend Changes:**

1. **`app/auth/signup/page.tsx`**
   - ✅ Redirect to `/onboarding/setup-hotel/{hotelId}` after signup

2. **`app/onboarding/setup-hotel/[id]/page.tsx`** (NEW FILE)
   - ✅ Complete hotel setup form
   - ✅ PATCH request to backend
   - ✅ Redirect to dashboard after success

3. **`app/auth/login/page.tsx`**
   - ✅ Store token and hotelId in localStorage
   - ✅ Redirect to dashboard using hotelId

---

## **API Endpoints Summary**

### **Authentication**
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/auth/signup` | Register user + create default hotel |
| POST | `/auth/login` | Login user + return hotelId |

### **Hotels**
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/hotels` | Create hotel (protected) |
| GET | `/hotels` | Get user's hotels (protected) |
| PATCH | `/hotels/{id}` | Update hotel details |
| GET | `/hotels/{id}` | Get hotel by ID |

---

## **Response Examples**

### **Signup Response**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "user-uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "createdAt": "2026-02-11T00:00:00Z",
    "updatedAt": "2026-02-11T00:00:00Z"
  },
  "hotelId": "hotel-uuid"
}
```

### **Login Response**
```json
{
  "message": "Login successful",
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user-uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210"
  },
  "hotelId": "hotel-uuid"
}
```

### **Update Hotel Response**
```json
{
  "id": "hotel-uuid",
  "ownerId": "user-uuid",
  "name": "Sunrise Beach Resort",
  "address": "123 Main St",
  "city": "New York",
  "country": "USA",
  "description": "Beautiful beachfront resort",
  "rating": "0",
  "imageUrl": "..."
}
```

---

## **How to Test**

### **Step 1: Start Backend**
```bash
cd backend
npm install
npm run start:dev
```

### **Step 2: Start Frontend**
```bash
cd frontend
npm install
npm run dev
```

### **Step 3: Test Registration Flow**
1. Go to `http://localhost:3000/auth/signup`
2. Fill signup form
3. You should be redirected to hotel setup page
4. Fill hotel details
5. You should be redirected to dashboard

### **Step 4: Test Login Flow**
1. Go to `http://localhost:3000/auth/login`
2. Log in with your credentials
3. You should be redirected to dashboard with hotelId

---

## **Key Features**

✅ **Automatic Hotel Creation** - Hotel is created when user signs up  
✅ **Hotel Setup Page** - User completes hotel info after signup  
✅ **Dashboard Access** - User redirected to dashboard after hotel setup  
✅ **Persistent Login** - Token & hotelId stored in localStorage  
✅ **Hotel Management** - Users can update hotel details anytime  
✅ **Multiple Hotels Support** - Can easily extend for multiple hotels per user  

---

## **Troubleshooting**

### **Issue: 404 on hotel setup page**
- Make sure folder structure is: `frontend/app/onboarding/setup-hotel/[id]/page.tsx`

### **Issue: Hotel not created on signup**
- Check if Hotel entity is imported in SignupModule
- Check database connection

### **Issue: Dashboard shows 404**
- Make sure hotelId is passed correctly in URL
- Check if `[id]` folder structure exists

### **Issue: CORS errors**
- Make sure backend is running on `http://localhost:4000`
- Check CORS configuration in backend

---

## **Next Steps (Future Enhancements)**

1. Add hotel logo upload to server storage
2. Add email verification on signup
3. Add multiple hotels per user support
4. Add hotel analytics & reports
5. Add staff member management
6. Add booking system integration

---

**Last Updated:** February 11, 2026
**Status:** ✅ Implementation Complete
