# Restaurant Review App

A full-stack web application for discovering restaurants and sharing reviews. Built as an introductory web development project, it covers the core pieces of a data-driven web app: user accounts, a relational database, a REST-style backend, and a multi-page front end.

## Features

- **User accounts** – registration and login
- **Restaurant listings** – browse restaurants with their details
- **Reviews** – submit reviews for individual restaurants
- **Persistent storage** – all data is stored in a MySQL database

## Tech Stack

| Layer      | Technology                           |
| ---------- | ------------------------------------ |
| Backend    | Node.js, Express                     |
| Database   | MySQL                                |
| Frontend   | HTML, CSS, JavaScript, Bootstrap 4   |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm
- MySQL (for example via [XAMPP](https://www.apachefriends.org/))

### Installation

1. Start MySQL (e.g. from the XAMPP control panel).
2. Create a database named `restaurant_review` and import the project's database scripts.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   node server.js
   ```
5. Open <http://127.0.0.1:8080> in your browser.

### Configuration

Database settings can be overridden with environment variables. The defaults suit a local XAMPP setup.

| Variable  | Default             |
| --------- | ------------------- |
| `DB_HOST` | `localhost`         |
| `DB_PORT` | `3306`              |
| `DB_USER` | `root`              |
| `DB_PASS` | *(empty)*           |
| `DB_NAME` | `restaurant_review` |

## Project Structure

```
.
├── server.js          # Express server and API routes
├── db-connection.js   # MySQL connection pool
└── public/            # Static front end (HTML, CSS, JS, images)
```

## Notes

This was my first web development project. It is kept here as a portfolio piece and is not intended for production use.
