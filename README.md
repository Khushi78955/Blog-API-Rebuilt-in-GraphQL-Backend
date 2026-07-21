# 🚀 Blog API Rebuilt with GraphQL

A production-style Blog API built using **GraphQL, Apollo Server, PostgreSQL, JWT Authentication, OAuth, DataLoader, and Docker**.

This project focuses on building a scalable backend architecture with authentication, authorization, relational database design, and efficient GraphQL data fetching.

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- Apollo Server
- GraphQL
- PostgreSQL
- JWT Authentication
- Passport.js
- Google OAuth 2.0
- GitHub OAuth

### Database
- PostgreSQL
- SQL schema design
- Relational data modeling
- Foreign keys
- Many-to-many relationships

### DevOps
- Docker
- Docker Compose
- PostgreSQL containerization

### Security
- bcrypt password hashing
- JWT access tokens
- Refresh token rotation
- OAuth authentication
- Input validation

---

# ✨ Features

## 🔐 Authentication

### Email & Password Authentication

Users can:

- Register
- Login
- Logout
- Refresh access tokens

Implemented using:

- bcrypt password hashing
- JWT access tokens
- JWT refresh tokens


### OAuth Authentication

Supported providers:

- Google OAuth
- GitHub OAuth


Users can authenticate using their existing accounts.

---

# 📝 Blog Features

## Posts

Users can:

- Create posts
- Read posts
- Update their own posts
- Delete their own posts


Each post contains:

- Title
- Content
- Slug
- Author
- Tags
- Created timestamp
- Updated timestamp


## Tags

Users can:

- Create tags
- Attach tags to posts
- Query tags

---

# ⚡ GraphQL API

The API uses Apollo Server with GraphQL SDL.

## Queries

Available queries:

```graphql
users
user(id)
posts
post(id)
tags
```

---

## Mutations

Available mutations:

### Authentication

```graphql
register
login
refreshToken
logout
```

### Posts

```graphql
createPost
updatePost
deletePost
```

### Tags

```graphql
createTag
```

---

# 🗄️ Database Design

Database contains:

## Users Table

Stores:

- username
- email
- password
- OAuth IDs
- refresh tokens


## Posts Table

Stores:

- title
- content
- slug
- author relationship


## Tags Table

Stores:

- tag names


## Post Tags Table

Handles:

- Many-to-many relationship between posts and tags


Relationship:

```
User
 |
 | 1:N
 |
Posts
 |
 | N:M
 |
Tags
```

---

# 🚀 Running Locally

## 1. Clone Repository

```bash
git clone <repository-url>

cd Blog-API-Rebuilt-in-GraphQL-Backend
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Environment Variables

Create:

```
.env
```

Add:

```env
PORT=4000

DB_USER=khushi
DB_PASSWORD=localhost
DB_HOST=localhost
DB_PORT=5432
DB_NAME=blog_graphql_db


JWT_ACCESS_SECRET=your_access_secret
JWT_ACCESS_EXPIRES_IN=15m

JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d


GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback


GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK_URL=http://localhost:4000/auth/github/callback


SESSION_SECRET=your_session_secret
```

---

# 🐳 Running With Docker

Build and start containers:

```bash
docker compose up --build
```

Services:

API:

```
http://localhost:4000/graphql
```

PostgreSQL:

```
localhost:5433
```

---

# 📂 Project Structure

```
.
├── server.js
├── Dockerfile
├── docker-compose.yml
├── package.json
│
└── src
    |
    ├── config
    │   └── passport.js
    |
    ├── db
    │   ├── db.js
    │   ├── schema.sql
    │   └── seed.sql
    |
    ├── graphql
    │   ├── schema
    │   │   └── typeDefs.js
    │   |
    │   └── resolvers
    │       ├── index.js
    │       ├── auth.resolver.js
    │       ├── post.resolver.js
    │       └── tag.resolver.js
    |
    ├── loaders
    │   └── user.loader.js
    |
    ├── middleware
    │   └── auth.middleware.js
    |
    ├── repositories
    │   ├── auth.repository.js
    │   ├── post.repository.js
    │   ├── tag.repository.js
    │   └── user.repository.js
    |
    ├── routes
    │   └── auth.routes.js
    |
    ├── services
    │   ├── auth.service.js
    │   ├── post.service.js
    │   └── tag.service.js
    |
    └── utils
        ├── errors.js
        ├── token.js
        └── validation.js
```

---

# 🔒 Security Features

Implemented:

- Password hashing using bcrypt
- JWT authentication
- Refresh token hashing
- Protected mutations
- Authorization checks
- Input validation
- Environment variable protection
- SQL injection prevention using parameterized queries

---

# ⚡ Performance Optimization

## DataLoader

Implemented DataLoader to solve the GraphQL N+1 query problem.

Without DataLoader:

```
Post
 |
 +-- Author Query
 |
 +-- Database call per post
```

With DataLoader:

```
Posts
 |
 +-- Batch user IDs
 |
 +-- Single database query
```

---

# 🧠 Architecture

The project follows a layered architecture:

```
GraphQL Resolver
        |
        ↓
Service Layer
        |
        ↓
Repository Layer
        |
        ↓
PostgreSQL Database
```

Responsibilities:

### Resolver Layer
Handles GraphQL requests.

### Service Layer
Contains business logic.

### Repository Layer
Handles database operations.

---

# 🧪 Future Improvements

- Automated testing with Jest + Supertest
- Redis caching
- Rate limiting
- Image uploads
- Pagination
- Search functionality
- CI/CD pipeline

---

# 👩‍💻 Author

Khushi

Built as a backend engineering project focusing on scalable API architecture.