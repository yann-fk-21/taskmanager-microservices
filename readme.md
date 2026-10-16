# Task Manager

A task management project organized into three Node.js/Express services:

- `user-service`: manages users with MongoDB.
- `task-service`: manages tasks with MongoDB.
- `auth-service`: handles registration, login, and token verification with MongoDB.

## Prerequisites

- Node.js and npm
- Docker and Docker Compose (for running the full stack)
- Node.js, npm, and MongoDB (for running services individually)

## Run a service

In a terminal, navigate to the directory of the service you want to run, then install its dependencies and start it:

```bash
cd user-service
npm install
npm run dev
```

Replace `user-service` with `task-service` or `auth-service` to run another service. Use `npm start` to run it outside development mode.

## Run the full stack with Docker Compose

Copy `.env.example` to `.env` and set a private `JWT_SECRET`, then start the stack from the repository root:

```bash
docker compose up --build
```

The gateway is available at `http://localhost:8080`. Authentication, task, and user endpoints are under `/api/v1/auth`, `/api/v1/tasks`, and `/api/v1/users`. Only the gateway port is published to the host; containers reach one another using their Compose service names.

MongoDB data is stored in the `mongo_data` named volume. Stop the stack with `docker compose down`; to also permanently delete the database volume, use `docker compose down -v`.

## Configuration

Create a `.env` file in each service as needed:

```env
PORT_USER_SERVICE=3000
MONGO_DB_USER=mongodb://127.0.0.1:27017/users
```

For `task-service`, configure `PORT_TASK_SERVICE` and `MONGO_DB_TASK`. The default ports are `8001` for `task-service` and `8002` for `auth-service`; `user-service` requires `PORT_USER_SERVICE`.

`task-service` uses `USER_SERVICE_URL` to look up users and `AUTH_SERVICE_URL` to verify tokens. The defaults target local development; when running in Compose, these are set to the `user-service` and `auth-service` container addresses.

Do not share `.env` files; they may contain sensitive information.

## Available routes

The services provide the following routes:

| Service        | Method | Route                   | Action                |
| -------------- | ------ | ----------------------- | --------------------- |
| Users          | GET    | `/api/v1/users`         | List users            |
| Users          | GET    | `/api/v1/users/:id`     | Get a user            |
| Users          | POST   | `/api/v1/users`         | Create a user         |
| Users          | PUT    | `/api/v1/users/:id`     | Update a user         |
| Users          | DELETE | `/api/v1/users/:id`     | Delete a user         |
| Tasks          | GET    | `/api/v1/tasks`         | List tasks            |
| Tasks          | GET    | `/api/v1/tasks/:id`     | Get a task            |
| Tasks          | POST   | `/api/v1/tasks`         | Create a task         |
| Tasks          | PUT    | `/api/v1/tasks/:id`     | Update a task         |
| Tasks          | DELETE | `/api/v1/tasks/:id`     | Delete a task         |
| Authentication | POST   | `/api/v1/auth/register` | Register              |
| Authentication | POST   | `/api/v1/auth/login`    | Log in                |
| Authentication | GET    | `/api/v1/auth/verify`   | Verify a bearer token |
