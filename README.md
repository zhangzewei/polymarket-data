# Polymarket Data Service

A NestJS-based service for collecting, storing, and analyzing Polymarket prediction market data. This service provides APIs to access market data, event information, and price history.

## Features

- Real-time market data collection
- Historical price tracking
- Event and market management
- CSV export functionality for market price history
- GraphQL API for data querying
- RESTful API endpoints for data access
- Automatic data synchronization with Polymarket
- Swagger API documentation

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

## Configuration

### Database Configuration

The service requires PostgreSQL database. Make sure you have PostgreSQL installed and running before starting the application.

#### PostgreSQL Requirements
- Version: 12 or higher
- Extensions: 
  - `uuid-ossp` (for UUID generation)
  - `pgcrypto` (for encryption functions)
  - `jsonb` (for JSON data type support)

#### Database Setup
1. Create a new PostgreSQL database:
```sql
CREATE DATABASE polymarket_data;
```

2. Enable required extensions:
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

3. Configure the database connection in `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=polymarket_data
```

### Other Configuration

Edit the `.env` file with other configuration settings as needed.

## Database Setup

The project uses TypeORM migrations to manage database schema. To create the database tables:

```bash
# Run all migrations
npm run typeorm migration:run

# If you need to revert migrations
npm run typeorm migration:revert
```

Migration files are located in `src/migrations/` and will be executed in the following order:
1. Create Tasks Table
2. Create Events Table
3. Create Markets Table
4. Create Market Price Histories Table

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

## API Documentation

### Swagger UI
The service includes Swagger UI for interactive API documentation. Access the Swagger documentation at `/api` when running the application.

Features:
- Interactive API documentation
- Try out API endpoints directly from the browser
- View request/response schemas
- Download OpenAPI specification

### REST API Endpoints

#### Events
- `GET /events` - Get all events
- `GET /events/:eventId` - Get event by ID
- `GET /events/:eventId/markets` - Get markets for an event
- `GET /events/:eventId/market-price-history/download-csv` - Download market price history as CSV

#### Markets
- `GET /markets/:marketId` - Get market by ID

### GraphQL API

The service provides a GraphQL API for flexible data querying. Access the GraphQL playground at `/graphql` when running the application.

#### Available Queries
- `events` - Query all events with filtering options
- `event` - Get a specific event by ID
- `markets` - Query markets with various filters
- `market` - Get a specific market by ID
- `marketPriceHistories` - Get price history for markets

#### Example GraphQL Query
```graphql
query {
  events {
    eventId
    title
    markets {
      marketId
      question
      priceHistories {
        bestBid
        bestAsk
        createdAt
      }
    }
  }
}
```

## CSV Export Format

The market price history CSV export includes the following columns:
- Event Slug
- Market Slug
- Group Item Title
- Active Status
- Outcomes
- Outcome Prices
- Timestamp
- Best Bid
- Best Ask

## Development

```bash
# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Generate migration
npm run typeorm migration:generate -- -n MigrationName
```

## Deployment

1. Set up a PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Build and start the application

```bash
# Build the application
npm run build

# Start in production mode
npm run start:prod
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
