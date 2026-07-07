# Growganic backend

A small Express API that the admin dashboard (`AdminLogin.jsx` / `AdminDashboard.jsx`)
talks to, and that the public site reads videos & testimonials from.

Data is stored in a local `data.json` file (created automatically on first run) —
no database server to install or configure.

## Setup

```bash
cd server
npm install
cp .env.example .env
```

Open `.env` and set your own admin login + a random JWT secret:

```
PORT=5000
JWT_SECRET=replace-with-a-long-random-string
ADMIN_USERNAME=your-username
ADMIN_PASSWORD=your-password
```

## Run

```bash
npm start
```

Server runs at `http://localhost:5000`. Leave this running in its own terminal
while the frontend dev server runs separately.

## Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | /api/auth/login | — | Admin login, returns a token |
| GET | /api/videos | public | List portfolio videos |
| POST | /api/videos | admin | Add a video |
| PUT | /api/videos/:id | admin | Edit a video |
| DELETE | /api/videos/:id | admin | Remove a video |
| GET | /api/testimonials | public | List testimonials |
| POST | /api/testimonials | admin | Add a testimonial |
| PUT | /api/testimonials/:id | admin | Edit a testimonial |
| DELETE | /api/testimonials/:id | admin | Remove a testimonial |
| GET | /api/inquiries | admin | List contact-form submissions |
| POST | /api/inquiries | public | Submit the contact form |
| DELETE | /api/inquiries/:id | admin | Remove a submission |

Admin routes need `Authorization: Bearer <token>` (the token from `/api/auth/login`).
