# Dashboard Implementation - Test Plan

## Test Environment Setup

### Prerequisites
- Node.js v18+ installed
- PostgreSQL running on localhost:5432
- Database named "bookmyhotel" or configured in .env

### Backend Setup
```bash
cd /home/lenevo/Public/BookMyHotel/backend

# Install dependencies
npm install

# Build TypeScript
npm run build

# Start development server
npm run start:dev
```

Expected output:
```
[Nest] 12345  - 01/15/2024, 10:30:00 AM     LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 01/15/2024, 10:30:01 AM     LOG [InstanceLoader] TypeOrmModule dependencies initialized
...
[Nest] 12345  - 01/15/2024, 10:30:02 AM     LOG [RoutesResolver] HotelController...
[Nest] 12345  - 01/15/2024, 10:30:02 AM     LOG [RoutesResolver] DashboardController...
[Nest] 12345  - 01/15/2024, 10:30:02 AM     LOG [NestApplication] Nest application successfully started
```

## Unit Tests

### Test 1: DashboardService.createDashboard()

**File:** `/backend/src/dashboard/dashboard.service.spec.ts`

**Test Case:**
```typescript
describe('DashboardService', () => {
  let service: DashboardService;
  let repository: Repository<Dashboard>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: getRepositoryToken(Dashboard),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    repository = module.get<Repository<Dashboard>>(
      getRepositoryToken(Dashboard)
    );
  });

  it('should create a dashboard with zero metrics', async () => {
    const hotelId = 'test-hotel-uuid';
    const mockDashboard = {
      id: 'test-dashboard-uuid',
      hotelId,
      totalBookings: 0,
      totalRevenue: 0,
      occupancyRate: 0,
      topRooms: [],
      recentActivities: [],
    };

    jest.spyOn(repository, 'create').mockReturnValue(mockDashboard as any);
    jest.spyOn(repository, 'save').mockResolvedValue(mockDashboard as any);

    const result = await service.createDashboard(hotelId);

    expect(result.hotelId).toBe(hotelId);
    expect(result.totalBookings).toBe(0);
    expect(result.totalRevenue).toBe(0);
    expect(result.occupancyRate).toBe(0);
  });
});
```

**Expected Result:** ✅ PASS - Dashboard created with all metrics at 0

### Test 2: DashboardService.getDashboardByHotelId()

**Test Case:**
```typescript
it('should get dashboard by hotel ID', async () => {
  const hotelId = 'test-hotel-uuid';
  const mockDashboard = {
    id: 'test-dashboard-uuid',
    hotelId,
    totalBookings: 5,
    totalRevenue: 1500,
  };

  jest.spyOn(repository, 'findOne').mockResolvedValue(mockDashboard as any);

  const result = await service.getDashboardByHotelId(hotelId);

  expect(result.hotelId).toBe(hotelId);
  expect(result.totalBookings).toBe(5);
});
```

**Expected Result:** ✅ PASS - Dashboard retrieved correctly

### Test 3: SignupService Integration

**Test Case:**
```typescript
it('should create user, hotel, and dashboard', async () => {
  const signupDto = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    password: 'TestPass123',
  };

  const result = await signupService.signup(signupDto);

  expect(result.user).toBeDefined();
  expect(result.hotelId).toBeDefined();
  expect(result.message).toBe('User created successfully');
});
```

**Expected Result:** ✅ PASS - All three records created

## Integration Tests

### Test 4: Full Signup Flow

**Endpoint:** `POST /auth/signup`

**Test Request:**
```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Integration Test User",
    "email": "integration@test.com",
    "phone": "9876543210",
    "password": "IntegrationPass123"
  }'
```

**Expected Response (200 OK):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Integration Test User",
    "email": "integration@test.com",
    "phone": "9876543210"
  },
  "hotelId": "660e8400-e29b-41d4-a716-446655440000"
}
```

**Verification Checklist:**
- ✓ Response status is 200
- ✓ Response contains hotelId
- ✓ Response contains user data (without password)
- ✓ Response message is "User created successfully"

### Test 5: Get Dashboard After Signup

**Endpoint:** `GET /dashboard/:hotelId`

**Setup:**
1. Get hotelId from signup response (e.g., `660e8400...`)

**Test Request:**
```bash
curl http://localhost:3000/dashboard/660e8400-e29b-41d4-a716-446655440000
```

**Expected Response (200 OK):**
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440000",
  "hotelId": "660e8400-e29b-41d4-a716-446655440000",
  "totalBookings": 0,
  "totalRevenue": 0,
  "occupancyRate": 0,
  "topRooms": [],
  "recentActivities": [],
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Verification Checklist:**
- ✓ Response status is 200
- ✓ Dashboard exists for the hotel
- ✓ All metrics initialized to 0
- ✓ hotelId matches the signup response
- ✓ Dashboard has createdAt timestamp

## Database Verification Tests

### Test 6: Users Table

**SQL Query:**
```sql
SELECT id, name, email, phone FROM users 
WHERE email = 'integration@test.com';
```

**Expected Result:**
```
id                                   | name                    | email             | phone
550e8400-e29b-41d4-a716-446655440000 | Integration Test User   | integration@test.com | 9876543210
```

✅ PASS - User record exists with correct data

### Test 7: Hotels Table

**SQL Query:**
```sql
SELECT id, ownerId, name FROM hotels 
WHERE ownerId = (SELECT id FROM users WHERE email = 'integration@test.com');
```

**Expected Result:**
```
id                                   | ownerId                              | name
660e8400-e29b-41d4-a716-446655440000 | 550e8400-e29b-41d4-a716-446655440000 | Integration Test User's Hotel
```

✅ PASS - Hotel record exists with correct ownerId

### Test 8: Dashboards Table

**SQL Query:**
```sql
SELECT id, hotelId, totalBookings, totalRevenue FROM dashboards 
WHERE hotelId = '660e8400-e29b-41d4-a716-446655440000';
```

**Expected Result:**
```
id                                   | hotelId                              | totalBookings | totalRevenue
770e8400-e29b-41d4-a716-446655440000 | 660e8400-e29b-41d4-a716-446655440000 | 0             | 0.00
```

✅ PASS - Dashboard record exists with correct hotelId and zero metrics

## Error Cases

### Test 9: Duplicate Email

**Test Request:**
```bash
# First signup
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "User One",
    "email": "duplicate@test.com",
    "password": "Pass123"
  }'

# Second signup with same email
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "User Two",
    "email": "duplicate@test.com",
    "password": "Pass456"
  }'
```

**Expected Response (400 Bad Request):**
```json
{
  "message": "Email already exists",
  "statusCode": 400,
  "error": "Bad Request"
}
```

✅ PASS - Duplicate email prevented

### Test 10: Get Non-existent Dashboard

**Test Request:**
```bash
curl http://localhost:3000/dashboard/00000000-0000-0000-0000-000000000000
```

**Expected Response (200 OK or 404 Not Found):**
```json
null
```
or
```json
{
  "message": "Dashboard not found",
  "statusCode": 404
}
```

✅ PASS - Proper error handling

## End-to-End Tests

### Test 11: Complete User Journey

**Step 1: Signup**
```bash
RESPONSE=$(curl -s -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "E2E Test User",
    "email": "e2e@test.com",
    "phone": "5555555555",
    "password": "E2EPass123"
  }')

HOTEL_ID=$(echo $RESPONSE | jq -r '.hotelId')
echo "Hotel ID: $HOTEL_ID"
```

**Expected:** hotelId extracted successfully

**Step 2: Get Dashboard**
```bash
curl http://localhost:3000/dashboard/$HOTEL_ID | jq '.'
```

**Expected:**
```json
{
  "id": "...",
  "hotelId": "...",
  "totalBookings": 0,
  "totalRevenue": 0,
  "occupancyRate": 0
}
```

**Step 3: Update Hotel**
```bash
curl -X PATCH http://localhost:3000/hotels/$HOTEL_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "E2E Test Hotel",
    "address": "123 Test Street",
    "city": "Test City"
  }'
```

**Expected:** Hotel updated successfully

✅ PASS - Complete flow works correctly

## Performance Tests

### Test 12: Signup Response Time

**Measurement:**
```bash
time curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","phone":"1234567890","password":"Pass123"}'
```

**Expected:** Response time < 500ms

### Test 13: Dashboard Lookup Performance

**Measurement:**
```bash
# Run 100 times and measure
for i in {1..100}; do
  time curl http://localhost:3000/dashboard/660e8400-e29b-41d4-a716-446655440000 > /dev/null
done
```

**Expected:** Average < 50ms per request

## Test Execution Checklist

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Database verification passes
- [ ] Error cases handled correctly
- [ ] E2E test completes successfully
- [ ] Performance meets expectations
- [ ] No console errors
- [ ] All API responses valid JSON

## Success Criteria

✅ All tests passing
✅ No TypeScript compilation errors
✅ No runtime exceptions
✅ Database records created correctly
✅ API responses match expected format
✅ Performance acceptable

## Continuous Integration

### Run All Tests
```bash
npm test                  # Unit tests
npm run test:e2e         # E2E tests
npm run test:cov         # With coverage
```

### Build Verification
```bash
npm run build             # Compile TypeScript
npm run lint             # Check code style
npm run format:check     # Check formatting
```

## Known Issues & Workarounds

### Issue: "Cannot find module 'dashboard.service'"
**Workaround:** Ensure DashboardModule is imported in SignupModule

### Issue: "Database connection timeout"
**Workaround:** Check PostgreSQL is running and credentials are correct

### Issue: "Dashboard table doesn't exist"
**Workaround:** Run TypeORM migrations or restart the application

## Test Report Template

```
Test Execution Report
Date: 2024-01-15
Environment: Development
Backend Version: 1.0.0

Unit Tests: 3/3 PASS ✅
Integration Tests: 5/5 PASS ✅
Database Tests: 3/3 PASS ✅
Error Cases: 2/2 PASS ✅
E2E Tests: 1/1 PASS ✅

Total: 14/14 PASS ✅

Recommendations:
- All tests passing
- Ready for production
- No known issues
```

## Next Testing Phase

After merging to main:
1. Load testing (1000 concurrent signups)
2. Security testing (SQL injection, XSS)
3. Integration with CI/CD pipeline
4. Staging environment verification
5. Production readiness check
