# Full Stack Todo App Frontend

The Next.js frontend for the [Full Stack Todo App Backend](https://github.com/alex-avila/fullstack-todo-app-test-backend).

Please follow the instructions the repository for the backend to run the server then follow the instructions below to run the full stack todo app.

## Prerequisites

LTS versions of the following are recommended

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

## Setup

1. Clone the repository

2. Install the dependencies:

    ```bash
    pnpm install
    ```

3. Configure environment variables:

    - Create a `.env` file in the root directory
    - Use `.env.sample` as an example
    - `NEXT_PUBLIC_API_URL` can stay the same if `PORT` is still `5173` in the [backend's repository](https://github.com/alex-avila/fullstack-todo-app-test-backend)

## Run the app

- To run the development server:

    ```bash
    pnpm dev
    ```

- To run the app in production:

    ```bash
    pnpm build # the backend's server must be running so that Next.js can prerender
    pnpm start
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.
