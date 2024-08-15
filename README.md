# Collaborative Canvas Project

Welcome to the Collaborative Canvas Project! This project is designed to enable collaborative work on canvas board with group chat support online. It consists of two main components:

- **Frontend**: The client-side application where users interact with the canvas.
- **Backend**: The server-side application that handles data storage, authentication, and real-time communication.

## Table of Contents

- [Project Overview](#project-overview)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The Collaborative Canvas Project allows multiple users to work on a shared canvas in real-time. It includes features such as:

- Real-time updates
- User authentication
- Canvas drawing and editing tools
- Collaborative features (e.g., chat, user presence)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Frontend

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Start the development server:

    ```bash
    npm start
    # or
    yarn start
    ```

### Backend

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Set up environment variables. Create a `.env` file based on the `.env.example` file provided:

    ```bash
    cp .env.example .env
    ```

4. Start the server:

    ```bash
    npm start
    # or
    yarn start
    ```

## Usage

1. **Frontend**: Open your browser and go to `http://localhost:3000` to access the application.
2. **Backend**: The server will be running on `http://localhost:5000` by default.

Ensure that both frontend and backend servers are running simultaneously to enable full functionality.

## Folder Structure

### Frontend

- `frontend/`
    - `src/` - Source files for the frontend application
    - `public/` - Static files
    - `components/` - React components
    - `hooks/` - Custom React hooks
    - `utils/` - Utility functions and helpers

### Backend

- `backend/`
    - `src/` - Source files for the backend application
    - `controllers/` - Request handlers
    - `models/` - Database models
    - `routes/` - API routes
    - `services/` - Business logic
    - `utils/` - Utility functions and helpers

## Contributing

We welcome contributions to the Collaborative Canvas Project! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request with a description of your changes.

Please ensure your code adheres to our coding standards and passes all tests.

## License

This project is licensed under the MIT License.

---

Feel free to reach out to us with any questions or feedback!