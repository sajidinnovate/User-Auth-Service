# User Auth Service

A simple user registration API for E-commerce platform using Express.js and PostgreSQL.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and configure your database credentials

3. Initialize database:
   ```bash
   node init_db.js
   ```

4. Run tests:
   ```bash
   npm test
   ```

## API Endpoints

### POST /users
Register a new user

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response (201):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-05-05T10:30:00.000Z"
}
```

## Testing

Run integration tests:
```bash
npm test
```

Tests verify:
- User is successfully created
- User data is stored in database
- Test data cleanup after execution

## Project Structure

```
├── server.js          # Express application and routes
├── db_config.js       # PostgreSQL connection configuration
├── init_db.js         # Database schema initialization script
├── users.test.js      # Integration tests
├── package.json       # Project metadata and dependencies
├── .env.example       # Example environment configuration
├── .gitignore         # Git ignore rules
└── .github/
    └── workflows/
        └── test.yml   # GitHub Actions CI workflow
```
