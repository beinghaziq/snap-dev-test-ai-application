# AI Contract Review Service

This project is an AI-powered service that automates the initial contract review and redlining process for SaaS agreements.

## Technology Stack

*   **Frontend:** Next.js, shadcn/ui
*   **Backend:** Python, FastAPI
*   **Database:** MongoDB

## Getting Started

### Prerequisites

*   Node.js
*   Python 3.12
*   MongoDB Atlas account
*   OpenAI API key
*   Google Cloud credentials for the Google Docs API

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd <your-repo-name>
    ```

2.  **Backend Setup:**
    *   Navigate to the `backend` directory:
        ```bash
        cd backend
        ```
    *   Create and activate a virtual environment:
        ```bash
        python3 -m venv venv
        source venv/bin/activate
        ```
    *   Install the required packages:
        ```bash
        pip install -r requirements.txt
        ```
    *   Create a `.env` file and populate it with your credentials (see `.env.example`).

3.  **Frontend Setup:**
    *   Navigate to the `frontend` directory:
        ```bash
        cd ../frontend
        ```
    *   Install the required packages:
        ```bash
        npm install
        ```
    *   Create a `.env.local` file and populate it with your credentials (see `.env.local.example`).

### Running the Application

1.  **Start the backend server:**
    ```bash
    cd backend
    uvicorn main:app --reload
    ```

2.  **Start the frontend server:**
    ```bash
    cd ../frontend
    npm run dev
    ```

The application will be available at `http://localhost:3000`.