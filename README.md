% Caarobar Monorepo

Production-ready cross-platform staff-management app.

## Tech Stack
- Frontend: Expo (React Native + Web), TypeScript, NativeWind (Tailwind)
- Backend: Node.js, TypeScript, Express, Prisma, PostgreSQL

## Quick Start

1) Backend + DB with Docker (MongoDB)

```bash
cd backend && docker compose -f ../docker-compose.yml up --build
```

Separately, install deps locally if developing outside Docker:
```bash
cd backend
npm install
npm run dev
```

Run tests:
```bash
npm test
```

2) Frontend
```bash
cd frontend
npm install
npx expo start --web
```

## Environment
Copy `.env.example` to `.env` and adjust.

- API on `http://localhost:5000`
- MongoDB Atlas: Update `DATABASE_URL` with your Atlas connection string
  - Format: `mongodb+srv://riturajgupta499:qUIICffFBUfBvZFz@cluster.mongodb.net/Caarobar?retryWrites=true&w=majority`

## API Docs
OpenAPI spec at `api-docs/openapi.yaml`.

## Initial Features
- Language Selection screen with persistence
- POST /auth/request-otp endpoint with mocked OTP service
- POST /auth/verify-otp endpoint with OTP verification
- Jest e2e covering the endpoints

## DEV ONLY - Development Bypass

**⚠️ WARNING: This feature is for development only. REMOVE/DISABLE `DEV_BYPASS_ENABLED` BEFORE PRODUCTION DEPLOYMENT.**

### Setup Development Bypass

1. **Set environment variables** in your `.env` file:
```bash
DEV_BYPASS_ENABLED=true
DEV_BYPASS_IDENTIFIER=9999999999
DEV_BYPASS_NAME=Dev Tester
```

2. **Seed the dev user**:
```bash
cd backend
npm run seed:dev
```

3. **Use the bypass**:
   - Use `9999999999` (or your custom `DEV_BYPASS_IDENTIFIER`) as the phone/email
   - Enter any 4-digit OTP (e.g., `1234`)
   - The server will automatically bypass OTP verification and return a valid JWT token

### How It Works

- The bypass is **only enabled** when `DEV_BYPASS_ENABLED=true` AND `NODE_ENV !== 'production'`
- In production, the bypass is **completely disabled** regardless of environment variables
- The dev user is automatically created with ADMIN role if it doesn't exist
- The response format is identical to normal OTP verification, so no frontend changes are needed

### API Response Format

When bypass is used, the response matches the normal verify-otp format:

```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "Dev Tester",
    "email": "dev-9999999999@example.com",
    "phone": "9999999999",
    "role": "ADMIN",
    "status": "offline"
  }
}
```

### Testing

Run the bypass tests:
```bash
cd backend
npm test -- auth-bypass.test.ts
```


