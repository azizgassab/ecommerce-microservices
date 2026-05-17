# Frontend React (Microservices Project)

Professional ecommerce frontend built with React, connected to API Gateway and backend microservices.

## Features

- Client-side routing (`Home`, `Products`, `Product Details`, `Cart`, `Orders`, `NotFound`)
- Modular architecture (`components`, `pages`, `services`, `hooks`, `context`, `layouts`, `styles`, `utils`)
- REST + GraphQL API integration layer
- Cart management with persistent local state
- Order creation flow compatible with backend order-service events
- Loading, empty, and error states for production-style UX
- Responsive UI for desktop/mobile

## Run locally

```bash
cd frontend
npm install
npm start
```

Default app URL: `http://localhost:3000`

## Environment variables

Copy `.env.example` to `.env` and adjust if needed.

- `REACT_APP_GATEWAY_REST_URL`
- `REACT_APP_GATEWAY_GRAPHQL_URL`
- `REACT_APP_PRODUCTS_SERVICE_URL`
- `REACT_APP_ORDERS_SERVICE_URL`
- `REACT_APP_REQUEST_TIMEOUT_MS`

## Docker

Build and run frontend only:

```bash
docker build -t ecommerce-frontend ./frontend
docker run -p 3004:3000 ecommerce-frontend
```

Run full stack:

```bash
docker compose up --build
```

Frontend URL with compose: `http://localhost:3004`
