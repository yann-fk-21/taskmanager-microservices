# Task Manager

A task management project organized into three Node.js/Express services:

- `user-service`: manages users with MongoDB.
- `task-service`: manages tasks with MongoDB.
- `auth-service`: starting point for the authentication service.

## Prerequisites

- Node.js and npm
- MongoDB for the user and task services

## Run a service

In a terminal, navigate to the directory of the service you want to run, then install its dependencies and start it:

```bash
cd user-service
npm install
npm run dev
```

Replace `user-service` with `task-service` or `auth-service` to run another service. Use `npm start` to run it outside development mode.

## Configuration

Create a `.env` file in each service as needed:

```env
PORT_USER_SERVICE=3000
MONGO_DB_USER=mongodb://127.0.0.1:27017/users
```

For `task-service`, configure `PORT_TASK_SERVICE` and `MONGO_DB_TASK`. The port for `auth-service` is optional and defaults to `3001`. The default port for `task-service` is `3002`. `user-service` requires `PORT_USER_SERVICE`.

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
| Authentication | GET | `/api/auth` | Check that the service is responding |