# Dashboard Implementation - Visual Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Signup Page → Hotel Setup Page → Dashboard Page               │
│                                                                   │
│  POST /auth/signup    PATCH /hotels/:id    GET /dashboard/:id   │
│                                                                   │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      │ HTTP/REST
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│                    Backend (NestJS)                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │           SignupService (NEW!)                          │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ • createUser()                                          │   │
│  │ • createHotel()                                         │   │
│  │ • createDashboard() ← Calls DashboardService           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────┐  ┌──────────────────────┐            │
│  │   HotelService       │  │ DashboardService     │            │
│  ├──────────────────────┤  ├──────────────────────┤            │
│  │ • getHotel()         │  │ • createDashboard()  │            │
│  │ • updateHotel()      │  │ • getDashboard()     │            │
│  │ • getHotelByIdOnly() │  │ • updateDashboard()  │            │
│  └──────────────────────┘  └──────────────────────┘            │
│                                                                   │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      │ Database Queries
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│                   PostgreSQL Database                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │    users     │    │    hotels    │    │   dashboards     │  │
│  ├──────────────┤    ├──────────────┤    ├──────────────────┤  │
│  │ id (UUID)    │    │ id (UUID)    │    │ id (UUID)        │  │
│  │ name         │    │ ownerId (FK) │    │ hotelId (FK) ────┼─┤
│  │ email        │──┐ │ name         │    │ totalBookings    │  │
│  │ phone        │  └─│ address      │    │ totalRevenue     │  │
│  │ password     │    │ city         │    │ occupancyRate    │  │
│  │              │    │ country      │    │ topRooms[]       │  │
│  │              │    │ description  │    │ recentActivities │  │
│  └──────────────┘    │ rating       │    │                  │  │
│                      │ imageUrl     │    │                  │  │
│                      └──────────────┘    └──────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow - Signup Process

```
User Input (Signup Form)
│
├─ name, email, phone, password
│
▼
┌──────────────────────────────────────────┐
│ Frontend: POST /auth/signup              │
│                                          │
│ Headers: Content-Type: application/json │
└──────────┬───────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────┐
│ Backend: SignupController                │
│                                          │
│ @Post('signup')                          │
│ async signup(signupDto)                  │
└──────────┬───────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────┐
│ SignupService.signup()                   │
│                                          │
│ 1. Hash password                         │
│ 2. Create User record                    │
│    ├─ INSERT INTO users                  │
│    └─ Returns: user with UUID id         │
│                                          │
│ 3. Create Hotel record                   │
│    ├─ INSERT INTO hotels                 │
│    └─ Returns: hotel with UUID id        │
│                                          │
│ 4. ➜ dashboardService.createDashboard()  │ ← NEW!
│    ├─ CREATE Dashboard entity            │
│    ├─ Set hotelId = hotel.id             │
│    ├─ Initialize metrics to 0            │
│    ├─ INSERT INTO dashboards             │
│    └─ Returns: dashboard with UUID id    │
│                                          │
│ 5. Return response with hotelId          │
└──────────┬───────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────┐
│ Frontend: Receives Response              │
│                                          │
│ {                                        │
│   "hotelId": "660e8400...",              │
│   "user": { ... },                       │
│   "message": "..."                       │
│ }                                        │
│                                          │
│ localStorage.setItem('hotelId', ...)     │
│ router.push('/onboarding/setup-hotel/...') │
└──────────────────────────────────────────┘
```

## Module Dependency Graph

```
┌─────────────────────────┐
│   AppModule             │
│                         │
│ ├─ TypeOrmModule       │
│ ├─ AuthModule          │
│ ├─ HotelModule         │
│ └─ DashboardModule ← Main module for dashboard
│                         │
│    ┌────────────────────┘
│    │
│    ▼
├─ AuthModule
│  │
│  ├─ SignupModule
│  │  │
│  │  ├─ imports: [TypeOrmModule.forFeature([User, Hotel])]
│  │  │
│  │  ├─ imports: [DashboardModule] ← NEW!
│  │  │  │
│  │  │  └─ Provides: DashboardService
│  │  │
│  │  └─ SignupService (injects DashboardService)
│  │
│  └─ LoginModule
│
├─ HotelModule
│  ├─ imports: [TypeOrmModule.forFeature([Hotel])]
│  └─ HotelService
│
└─ DashboardModule
   ├─ imports: [TypeOrmModule.forFeature([Dashboard])]
   ├─ providers: [DashboardService]
   ├─ controllers: [DashboardController]
   └─ exports: [DashboardService] ← NEW! Allows other modules to use it
```

## Entity Relationship Diagram

```
users
├─ id (UUID) - PK
├─ name
├─ email
├─ phone
├─ password (hashed)
├─ createdAt
└─ updatedAt
   │
   └─ 1:N
      │
      ▼
hotels
├─ id (UUID) - PK
├─ ownerId (UUID) - FK → users.id
├─ name
├─ address
├─ city
├─ country
├─ description
├─ rating
├─ imageUrl
├─ createdAt
└─ updatedAt
   │
   └─ 1:N
      │
      ▼
dashboards
├─ id (UUID) - PK
├─ hotelId (UUID) - FK → hotels.id
├─ totalBookings (INT, default: 0)
├─ totalRevenue (FLOAT, default: 0)
├─ occupancyRate (FLOAT, default: 0)
├─ topRooms (TEXT[], default: {})
├─ recentActivities (TEXT[], default: {})
├─ createdAt
└─ updatedAt
```

## Lifecycle - What Happens When User Signs Up

```
Time  Event                               Database Changes
────────────────────────────────────────────────────────────────
 T0   User fills signup form              
      └─ name, email, phone, password
                                          
 T1   POST /auth/signup received
      └─ Backend: SignupService.signup()
                                          
 T2   Hash password with bcrypt           
      └─ password → hashed_password
                                          
 T3   INSERT INTO users                   ✓ User created
      ├─ id: AUTO-GENERATED UUID          │ id: 550e8400...
      ├─ name: "John Doe"                 │
      ├─ email: "john@example.com"        │
      ├─ phone: "1234567890"              │
      └─ password: hashed
                                          
 T4   INSERT INTO hotels                  ✓ Hotel created
      ├─ id: AUTO-GENERATED UUID          │ id: 660e8400...
      ├─ ownerId: user.id                 │ ownerId: 550e8400...
      ├─ name: "John Doe's Hotel"         │
      └─ address: "" (empty for now)      │
                                          
 T5   ➜ NEW STEP: DashboardService        
      .createDashboard(hotelId)
      │
      └─ INSERT INTO dashboards          ✓ Dashboard created
         ├─ id: AUTO-GENERATED UUID       │ id: 770e8400...
         ├─ hotelId: hotel.id             │ hotelId: 660e8400...
         ├─ totalBookings: 0              │
         ├─ totalRevenue: 0.00            │
         ├─ occupancyRate: 0              │
         ├─ topRooms: []                  │
         └─ recentActivities: []          │
                                          
 T6   Return response to frontend         
      {
        "hotelId": "660e8400...",
        "user": { ... },
        "message": "User created"
      }
                                          
 T7   Frontend stores credentials
      localStorage.setItem('hotelId', ...)
      localStorage.setItem('token', ...)
                                          
 T8   Redirect to hotel setup page
      /onboarding/setup-hotel/660e8400...
```

## State Transitions

```
                         ┌─────────────────────────────────┐
                         │   Hotel Setup Page              │
                         │   (Filling hotel details)       │
                         └──────────┬──────────────────────┘
                                    │
                                    │ PATCH /hotels/:id
                                    │
                                    ▼
┌────────────────────────────────────────────────────────┐
│  Signup Page                                           │
│  ├─ User fills: name, email, phone, password         │
│  └─ POST /auth/signup                                │
│                                    │                   │
│                                    ▼                   │
│           ┌──────────────────────────────────┐        │
│           │ Backend Creates:                 │        │
│           │ • User record                    │        │
│           │ • Hotel record                   │        │
│           │ • Dashboard record ← NEW!        │        │
│           └──────────────┬───────────────────┘        │
│                          │                             │
│                          ▼                             │
│           Response with hotelId                       │
│           & store token in localStorage               │
└────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                         ┌─────────────────────────────────┐
                         │   Hotel Setup Complete          │
                         │   /dashboard/home/:id           │
                         │                                 │
                         │ ✓ User exists in database       │
                         │ ✓ Hotel exists in database      │
                         │ ✓ Dashboard exists with 0 metrics
                         │                                 │
                         └─────────────────────────────────┘
```

## Code Flow - SignupService

```
async signup(signupDto: SignupDto) {
  │
  ├─ Extract: name, email, phone, password
  │  │
  │  └─ ▼
  │     Check if user already exists
  │     ├─ If yes → throw BadRequestException
  │     └─ If no → continue
  │  
  ├─ ▼
  │  Hash password with bcrypt (10 rounds)
  │  │
  │  └─ ▼ (hashed_password)
  │  
  ├─ ▼
  │  Create User object
  │  ├─ name, email, phone
  │  └─ password: hashed_password
  │  
  ├─ ▼
  │  userRepository.save(user)
  │  │
  │  └─ ▼ (savedUser with id: UUID)
  │  
  ├─ ▼
  │  Create Hotel object
  │  ├─ ownerId: savedUser.id ← LINK TO USER
  │  ├─ name: "${name}'s Hotel"
  │  └─ address, city, country, etc: (empty)
  │  
  ├─ ▼
  │  hotelRepository.save(hotel)
  │  │
  │  └─ ▼ (savedHotel with id: UUID)
  │  
  ├─ ▼
  │  ➜ NEW: dashboardService.createDashboard(savedHotel.id)
  │     │
  │     └─ ▼
  │        Create Dashboard object
  │        ├─ hotelId: savedHotel.id ← LINK TO HOTEL
  │        ├─ totalBookings: 0
  │        ├─ totalRevenue: 0
  │        ├─ occupancyRate: 0
  │        ├─ topRooms: []
  │        └─ recentActivities: []
  │        
  │        ▼
  │        dashboardRepository.save(dashboard)
  │        │
  │        └─ ▼ (savedDashboard with id: UUID)
  │
  ├─ ▼
  │  Remove password from user object
  │  │
  │  └─ ▼ (userWithoutPassword)
  │
  └─ ▼
     Return {
       message: "User created successfully",
       user: userWithoutPassword,
       hotelId: savedHotel.id ← Frontend needs this!
     }
```

## API Response Types

```
┌────────────────────────────────────────────────┐
│ SignupResponse                                 │
├────────────────────────────────────────────────┤
│ {                                              │
│   message: string;                             │
│   user: {                                      │
│     id: string (UUID);                         │
│     name: string;                              │
│     email: string;                             │
│     phone: string;                             │
│     // password: NOT INCLUDED                  │
│   };                                           │
│   hotelId: string (UUID); ← KEY FOR FRONTEND  │
│ }                                              │
└────────────────────────────────────────────────┘
                    │
                    ▼
        ┌───────────────────────────┐
        │ DashboardResponse         │
        ├───────────────────────────┤
        │ {                         │
        │   id: UUID;               │
        │   hotelId: UUID;          │
        │   totalBookings: number;  │
        │   totalRevenue: number;   │
        │   occupancyRate: number;  │
        │   topRooms: string[];     │
        │   recentActivities: [];   │
        │   createdAt: Date;        │
        │   updatedAt: Date;        │
        │ }                         │
        └───────────────────────────┘
```

This visual architecture shows how all the pieces fit together to create the complete registration and dashboard flow.
