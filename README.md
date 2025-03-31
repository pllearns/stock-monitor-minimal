# Stock Monitor Interview Challenge

A 45-minute coding challenge to build a simple stock price monitoring dashboard.

## Requirements

Build a React application that:
1. Displays a list of stock prices
2. Allows adding new stocks by symbol
3. Shows price changes with color indicators
4. Updates prices in real-time using WebSocket
5. Handles loading and error states

### API Endpoints

```typescript
// REST API
GET /api/stocks              // Get all stocks
GET /api/stocks/:symbol      // Get specific stock

// WebSocket
ws://localhost:3001          // Real-time updates
```

### Data Structure

```typescript
interface Stock {
  symbol: string;
  price: number;
  change: number;
  volume: number;
  lastUpdated: string;
}
```

## Getting Started

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Start the development server:
   ```bash
   yarn dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `yarn dev` - Start development server
- `yarn test` - Run tests
- `yarn build` - Build for production

## Evaluation Criteria

1. Code organization and component structure
2. TypeScript usage and type safety
3. Error handling and loading states
4. WebSocket implementation
5. UI/UX and responsiveness

Good luck!
