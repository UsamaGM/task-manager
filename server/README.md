# Task Manager API Documentation

This documentation provides details about the Task Manager API.

## Base URL

The base URL for all API endpoints is `/api`.

## Authentication

Most endpoints require authentication using a JSON Web Token (JWT). The token should be included in the `Authorization` header of the request in the following format:

```
Bearer <token>
```

### Auth Routes

| Method | Endpoint      | Description          | Request Body                 | Response                      |
| ------ | ------------- | -------------------- | ---------------------------- | ----------------------------- |
| POST   | `/auth/login` | Logs in a user.      | `{ "email", "password" }`    | `{ "message", "user", "token" }` |
| POST   | `/auth/register`| Registers a new user.| `{ "username", "email", "password" }` | `{ "message", "newUser" }`     |
| GET    | `/auth/verify`  | Verifies a user's token. |                              | `200 OK`                      |

---

## User Routes

| Method | Endpoint                  | Description                   | Request Body                            | Response                               |
| ------ | ------------------------- | ----------------------------- | --------------------------------------- | -------------------------------------- |
| GET    | `/user/data`              | Fetches user data.            |                                         | `{ "teams", "projects", "tasks" }`     |
| GET    | `/user/:id`               | Fetches a user by ID.         |                                         | `{...user, teams}`                     |
| GET    | `/user/search/:query`     | Searches for users.           |                                         | `[{...user}]`                          |
| PUT    | `/user/profile-picture`   | Updates the user's profile picture. | `profilePicture` (file)                 | `{ "profilePicture" }`                 |

---

## Project Routes

| Method | Endpoint      | Description              | Request Body                 | Response                      |
| ------ | ------------- | ------------------------ | ---------------------------- | ----------------------------- |
| GET    | `/project/:id`| Fetches a project by ID. |                              | `{...project}`                |
| POST   | `/project`    | Creates a new project.   | `{ "name", "description", "startDate", "endDate" }` | `{...newProject}`             |
| PUT    | `/project`    | Updates a project.       | `{ "id", "data" }`           | `{...updatedProject}`         |
| DELETE | `/project/:id`| Deletes a project.       |                              | `{ "deletedProject", "deletedTasks" }` |

---

## Task Routes

| Method | Endpoint          | Description                | Request Body                 | Response                      |
| ------ | ----------------- | -------------------------- | ---------------------------- | ----------------------------- |
| GET    | `/task/:id`       | Fetches a task by ID.      |                              | `{...task}`                   |
| POST   | `/task`           | Creates a new task.        | `{ "taskData" }`             | `{...newTask}`                |
| PUT    | `/task`           | Updates a task.            | `{ "id", "updateData" }`     | `{...updatedTask}`            |
| PUT    | `/task/assign`    | Assigns a task to a member.| `{ "taskId", "userId" }`     | `{...updatedTask}`            |
| DELETE | `/task/:taskId`   | Deletes a task.            |                              | `{ "message" }`               |

---

## Team Routes

| Method | Endpoint               | Description                   | Request Body                 | Response                      |
| ------ | ---------------------- | ----------------------------- | ---------------------------- | ----------------------------- |
| GET    | `/team/:id`            | Fetches a team by ID.         |                              | `{...team}`                   |
| GET    | `/team/search/:query`  | Searches for teams.           |                              | `[{...team}]`                 |
| POST   | `/team`                | Creates a new team.           | `{ "name", "description" }`  | `{...newTeam}`                |
| PUT    | `/team`                | Updates a team.               | `{ "teamId", "updatedData" }`| `{...updatedTeam}`            |
| PUT    | `/team/assign`         | Assigns a project to a team.  | `{ "projectId", "teamId" }`  | `{...updatedTeam}`            |
| PUT    | `/team/add-member`     | Adds a member to a team.      | `{ "teamId", "members" }`    | `{...updatedTeam}`            |
| PUT    | `/team/remove-member`  | Removes a member from a team. | `{ "teamId", "members" }`    | `{...updatedTeam}`            |
| PUT    | `/team/leave/:id`      | Leaves a team.                |                              | `200 OK`                      |
| DELETE | `/team/:id`            | Deletes a team.               |                              | `200 OK`                      |

---