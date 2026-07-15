# EvolVIT Website Backend

A robust and scalable backend API for the official EvolVIT website. This service manages all event data, authentication, and core business logic for the club's web presence.

## 🏗️ Architecture Overview

The backend follows a modern, modular, and scalable architecture pattern:

- **MVC Pattern**: Follows a Model-View-Controller architecture for clear separation of concerns.
- **Modular Structure**: The application is divided into independent modules (`auth`, `events`, `users`, `core`) that can be developed, tested, and scaled in isolation.
- **Secure by Design**: Built with security in mind, featuring JWT-based authentication, secure password hashing, and rate limiting.
- **Scalable**: Designed to handle high concurrency with a proper connection pooling strategy.

## 🚀 Tech Stack

### Core Technologies

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Fast, unopinionated web framework for Node.js.
- **PostgreSQL**: Robust relational database management system.

### Data & ORM

- **Sequelize**: Promise-based Node.js ORM for PostgreSQL, providing model definition, migrations, and relationship management.
- **pg**: PostgreSQL client for Node.js.

### Security & Authentication

- **JWT (JSON Web Tokens)**: Secure token-based authentication.
- **Bcrypt.js**: Strong password hashing algorithm.
- **Helmet**: Collection of 14 small Express.js middleware utilities to set secure HTTP headers.
- **cors**: Middleware to enable Cross-Origin Resource Sharing.
- **express-rate-limit**: Simple rate limiting middleware for Express.

### API Documentation

- **Swagger UI**: Interactive API documentation with auto-generated UI.
- **swagger-jsdoc**: Parses JSDoc comments to generate Swagger/OpenAPI documentation.
- **openapi-types**: TypeScript types for OpenAPI specifications.

## 📂 Project Structure

```
src/
├── config/         # Environment and database configuration
├── models/         # Sequelize model definitions
├── controllers/    # Business logic layer
├── routes/         # API route definitions and middleware
├── middleware/     # Custom middleware (auth, validation, security)
├── services/       # Reusable business logic services
├── validations/    # Request validation schemas
└── utils/          # Utility functions
```

## 🔌 API Documentation

The API documentation is automatically generated and available at:

- **Swagger UI**: [Base URL]/api-docs
- **OpenAPI Spec**: [Base URL]/api-docs.json

### Key Endpoints

#### 🔐 Authentication

- `POST /auth/register`: Register a new user
- `POST /auth/login`: User login and token generation
- `POST /auth/refresh`: Refresh expired access tokens

#### 👤 Users

- `GET /users/me`: Get current user profile
- `PATCH /users/me`: Update current user profile
- `PATCH /users/me/password`: Change user password
- `GET /users/ leaderboard`: Get user leaderboard

#### 📅 Events

- `GET /events`: Get all events (with optional filtering)
- `POST /events`: Create a new event (Admin only)
- `GET /events/:id`: Get event by ID
- `PATCH /events/:id`: Update event (Admin only)
- `DELETE /events/:id`: Delete event (Admin only)

#### 🎟️ Registrations

- `GET /events/:id/registrations`: Get event registrations (Admin only)
- `GET /events/:id/registered`: Check if current user is registered
- `POST /events/:id/register`: Register for event
- `DELETE /events/:id/unregister`: Unregister from event

#### 📸 Photo Submissions

- `POST /events/:eventId/photos/submit`: Submit photo (Admin only)
- `POST /events/:eventId/photos/judge`: Rate a photo (Judge only)
- `POST /events/:eventId/photos/:photoId/highlight`: Mark as highlight (Admin only)
- `GET /events/:eventId/photos/summary`: Get photo ratings summary (Admin only)

## ⚙️ Configuration

The application uses environment variables for configuration. A `.env` file should be created in the root directory (though `.env` is in `.gitignore` for security).

### Required Environment Variables

- `DATABASE_URL`: PostgreSQL connection URL (e.g., `postgresql://user:password@localhost:5432/database`)
- `JWT_ACCESS_SECRET`: Secret key for JWT signing
- `JWT_REFRESH_SECRET`: Secret key for refresh tokens
- `JWT_ACCESS_EXPIRY`: Access token expiration time (e.g., `1h`)
- `JWT_REFRESH_EXPIRY`: Refresh token expiration time (e.g., `7d`)

### Optional Environment Variables

- `PORT`: Server port (default: `3000`)
- `NODE_ENV`: Environment (development, production, etc.)

## 🔧 Setup & Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/EvolVIT-Club/evolvit-backend.git
   cd evolvit-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file**

   ```bash
   cp .env.example .env  # If .env.example exists
   # OR manually create .env file with required variables
   ```

4. **Database Setup**

   Ensure PostgreSQL is running and the database exists.
   Run migrations to create tables:

   ```bash
   npm run db:migrate
   ```

   To seed the database with initial data:

   ```bash
   npm run db:seed
   ```

5. **Start Development Server**

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`.

## 🔄 Database Migrations

The backend uses Sequelize migrations to manage database schema changes.

- **Create a new migration**:

  ```bash
  npx sequelize-cli migration:create --name=migration-name
  ```

- **Run pending migrations**:

  ```bash
  npm run db:migrate
  ```

- **Rollback the last migration**:

  ```bash
  npm run db:migrate:undo
  ```

- **Rollback all migrations**:

  ```bash
  npm run db:migrate:undo:all
  ```

## 🔐 Authentication & Security

The backend uses JWT for authentication. Users must be authenticated to access protected routes.

1. **Login** to get an access token
2. **Include the token** in the `Authorization` header as `Bearer <token>`

### Role-Based Access Control

The system supports three roles:

- **admin**: Full access to all features, including event and photo management
- **judge**: Can rate photos (specific events only)
- **user**: Standard user with event registration and profile management

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) (if available) for detailed guidelines.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🛠️ Development & Debugging

### Running Tests

(Add testing instructions if available)

### Debug Mode

Set `DEBUG=true` environment variable for detailed logs:

```bash
DEBUG=true npm run dev
```

## 📝 API Usage Examples

### Example: Register for an Event

```bash
POST /events/2/register

Headers:
Authorization: Bearer <your-jwt-token>

Response: 200 OK
{
  "id": 123,
  "userId": 1,
  "eventId": 2,
  "registrationDate": "2024-01-15T1
