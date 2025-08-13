# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a NestJS-based logs microservice built with TypeScript. The service handles activity logging and user feedback for a larger microservice architecture. It uses PostgreSQL for data persistence, RabbitMQ for message queuing, and Prisma as the ORM.

## Development Commands

```bash
# Install dependencies
npm install

# Development mode (with file watching)
npm run start:dev

# Production mode
npm run start:prod

# Build the application
npm run build

# Run tests
npm run test

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e

# Lint code
npm run lint

# Format code
npm run format
```

## Database Management

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes to database
npx prisma db push

# Run migrations
npx prisma migrate dev

# Reset database
npx prisma migrate reset
```

## Docker Development

The service runs in a containerized environment with PostgreSQL and RabbitMQ:

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs nestjs

# Stop services
docker-compose down
```

## Architecture

### Database Schema
- **ActivityLog**: Main logging table tracking user actions with fields for userId, systemId, ipAddress, action, and JSON details
- **UserFeedback**: User feedback related to specific activity logs with cascade delete relationship

### RabbitMQ Integration
The service includes a RabbitMQ client for publishing authentication events:
- User registration, login, logout events
- Password changes and role assignments
- Session revocation events

### Key Components
- **RabbitMQService** (`src/rabbitmq/rabbitmq.service.ts`): Handles message publishing with predefined auth event methods
- **Prisma Schema** (`prisma/schema.prisma`): Defines ActivityLog and UserFeedback models with PostgreSQL-specific features
- **Docker Configuration**: Multi-stage build with health checks for dependencies

### Environment Variables
Required environment variables (see docker-compose.yml for full list):
- `DATABASE_URL`: PostgreSQL connection string
- `RABBITMQ_URL`: RabbitMQ connection URL
- `RABBITMQ_QUEUE_NAME`: Queue name for messages
- JWT secrets and expiration settings
- Throttling configuration

## Port Configuration
- Application: 5000 (in container), 5000 (host)
- PostgreSQL: 5432
- RabbitMQ: 5672 (AMQP), 15672 (Management UI)

## Testing
The project uses Jest for testing with TypeScript support. Test files follow the `*.spec.ts` pattern and are located alongside source files.