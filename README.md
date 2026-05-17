# Ecommerce Microservices Project

## Project Overview

This project is a scalable ecommerce platform built using a microservices architecture.

The application uses:

- API Gateway
- GraphQL
- gRPC
- Docker
- Docker Compose
- Kafka
- REST APIs
- Microservices Architecture

---

# Architecture

# Architecture

```text
                    Client
                       |
                 API Gateway
                       |
        ---------------------------------
        |               |               |
   User Service   Product Service   Order Service
        |                               |
      gRPC                            Kafka
                                        |
                              Notification Service
```
# Services

## API Gateway
- Port: 3000
- Handles routing and GraphQL

## Frontend (React)
- Port: 3004 (via Docker Compose)
- Professional ecommerce UI with routing, cart, orders, REST + GraphQL integration

## User Service
- Port: 5001
- Handles users with gRPC communication

## Product Service
- Port: 3001
- Handles products

## Order Service
- Port: 3002
- Handles orders and Kafka events

## Notification Service
- Port: 3003
- Handles notifications and Kafka consumers

---

# Technologies Used

- Node.js
- Express.js
- GraphQL
- Apollo Server
- gRPC
- Kafka
- Docker
- Docker Compose

---

# Installation

## Clone repository

```bash
git clone https://github.com/azizgassab/ecommerce-microservices.git
```

## Install dependencies

```bash
npm install
```

## Run Docker

```bash
docker compose up --build
```

Frontend access:

- `http://localhost:3004`

---

# Authors

- Aziz
- Gadour
