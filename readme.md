# Task Manager

A task management project organized into three Node.js/Express services:

- `user-service`: manages users with MongoDB.
- `task-service`: manages tasks with MongoDB.
<<<<<<< HEAD
- `auth-service`: starting point for the authentication service.
=======
- `auth-service`: handles registration, login, and token verification with MongoDB.
>>>>>>> 1c3b474 (feat: add api gateway)

## Prerequisites

- Node.js and npm
<<<<<<< HEAD
- MongoDB for the user and task services
=======
- Docker and Docker Compose (for running the full stack)
- Node.js, npm, and MongoDB (for running services individually)
>>>>>>> 1c3b474 (feat: add api gateway)

## Run a service

In a terminal, navigate to the directory of the service you want to run, then install its dependencies and start it:

```bash
cd user-service
npm install
npm run dev
```

Replace `user-service` with `task-service` or `auth-service` to run another service. Use `npm start` to run it outside development mode.

<<<<<<< HEAD
=======
## Run the full stack with Docker Compose

Copy `.env.example` to `.env` and set a private `JWT_SECRET`, then start the stack from the repository root:

```bash
docker compose up --build
```

The gateway is available at `http://localhost:8080`. Authentication, task, and user endpoints are under `/api/v1/auth`, `/api/v1/tasks`, and `/api/v1/users`. Only the gateway port is published to the host; containers reach one another using their Compose service names.

MongoDB data is stored in the `mongo_data` named volume. Stop the stack with `docker compose down`; to also permanently delete the database volume, use `docker compose down -v`.

>>>>>>> 1c3b474 (feat: add api gateway)
## Configuration

Create a `.env` file in each service as needed:

```env
PORT_USER_SERVICE=3000
MONGO_DB_USER=mongodb://127.0.0.1:27017/users
```

<<<<<<< HEAD
For `task-service`, configure `PORT_TASK_SERVICE` and `MONGO_DB_TASK`. The port for `auth-service` is optional and defaults to `3001`. The default port for `task-service` is `3002`. `user-service` requires `PORT_USER_SERVICE`.

`task-service` uses `USER_SERVICE_URL` to look up users before creating tasks. It defaults to `http://localhost:8000/api/v1/users`; set it in the `task-service` `.env` file if the user service runs at another address.
=======
For `task-service`, configure `PORT_TASK_SERVICE` and `MONGO_DB_TASK`. The default ports are `8001` for `task-service` and `8002` for `auth-service`; `user-service` requires `PORT_USER_SERVICE`.

`task-service` uses `USER_SERVICE_URL` to look up users and `AUTH_SERVICE_URL` to verify tokens. The defaults target local development; when running in Compose, these are set to the `user-service` and `auth-service` container addresses.
>>>>>>> 1c3b474 (feat: add api gateway)

Do not share `.env` files; they may contain sensitive information.

## Available routes

The services provide the following routes:

| Service | Method | Route | Action |
|---|---|---|---|
| Users | GET | `/api/v1/users` | List users |
| Users | GET | `/api/v1/users/:id` | Get a user |
| Users | POST | `/api/v1/users` | Create a user |
| Users | PUT | `/api/v1/users/:id` | Update a user |
| Users | DELETE | `/api/v1/users/:id` | Delete a user |
| Tasks | GET | `/api/v1/tasks` | List tasks |
| Tasks | GET | `/api/v1/tasks/:id` | Get a task |
| Tasks | POST | `/api/v1/tasks` | Create a task |
| Tasks | PUT | `/api/v1/tasks/:id` | Update a task |
| Tasks | DELETE | `/api/v1/tasks/:id` | Delete a task |
<<<<<<< HEAD
| Authentication | GET | `/api/auth` | Check that the service is responding |
=======
| Authentication | POST | `/api/v1/auth/register` | Register |
| Authentication | POST | `/api/v1/auth/login` | Log in |
| Authentication | GET | `/api/v1/auth/verify` | Verify a bearer token |
>>>>>>> 1c3b474 (feat: add api gateway)
