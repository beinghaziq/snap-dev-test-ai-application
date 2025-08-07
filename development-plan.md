# Project Blueprint: AI Contract Review Service

## 1. High-Level Architectural Decisions

### 1.1. Architecture Pattern Selection

*   **Decision:** Modular Monolith
*   **Rationale:** For this project, a modular monolith is the optimal choice. The application's scope, as defined in the MVP, is focused on a single, cohesive domain: contract analysis. A monolithic architecture will maximize development velocity for a solo developer by keeping the codebase unified, simplifying local development, and avoiding the operational overhead of managing multiple services. The "modular" aspect will be enforced through a strict, domain-driven folder structure, ensuring the codebase remains organized and can be potentially broken out into microservices in the future if specific technical needs arise (e.g., a dedicated, resource-intensive model-serving component). The current PRD does not present a compelling reason to start with a more complex microservices architecture.

### 1.2. Technology Stack Selection

The technology stack is chosen based on modern best practices, developer productivity, and performance. All versions are the latest stable releases as of August 2025.

*   **Frontend Framework & UI:**
    *   **Framework:** Next.js
    *   **Version:** ~15.4. The latest stable version of Next.js provides a powerful and flexible framework for building modern React applications. Its features like the App Router, server-side rendering, and a rich ecosystem make it an excellent choice for this project.
    *   **UI Components:** shadcn/ui
    *   **Version:** Latest (~0.9.5). shadcn/ui offers a set of accessible and unstyled components that can be easily customized. This approach avoids being locked into a specific design system and allows for rapid UI development that aligns perfectly with the project's visual identity.

*   **Backend Runtime & Framework:**
    *   **Runtime:** Python
    *   **Version:** ~3.12. Python 3.12 is a recent stable LTS version, offering excellent performance and language features. Its readability, extensive libraries (especially for AI/ML and document processing), and strong community support make it a solid foundation for the backend.
    *   **Framework:** FastAPI
    *   **Version:** Latest (~0.116.1). FastAPI is a high-performance web framework for Python that is easy to learn and use. Its automatic interactive documentation (Swagger UI) and Pydantic-based data validation will significantly speed up development and testing of the API.

*   **Primary Database:**
    *   **Database:** MongoDB Atlas (Free Tier)
    *   **Rationale:** A NoSQL document database like MongoDB provides the flexibility needed for agile development where data models can evolve. It maps naturally to Python and JavaScript objects, simplifying data access. The free tier of MongoDB Atlas is sufficient for development and early-stage production, offering up to 512MB of storage and 500 collections.

*   **AI & Document Processing:**
    *   **AI Service:** OpenAI API (or another major LLM provider like Anthropic Claude/Google Gemini)
    *   **Rationale:** The core of the product relies on a powerful Large Language Model. The OpenAI API is a mature and well-documented choice for this.
    *   **Document Parsing:** `python-docx` and `pypdf`
    *   **Rationale:** These Python libraries are standard for parsing `.docx` and `.pdf` files, respectively, allowing the backend to extract text content from uploaded documents.

### 1.3. Core Infrastructure & Services (Local Development Focus)

*   **Local Development:** The project will be run using simple command-line instructions (`npm run dev` for frontend, `uvicorn main:app --reload` for backend). No containerization (Docker) is needed for the initial local setup to ensure simplicity and speed.
*   **File Storage:** For uploaded contracts, use a simple local file system storage. A designated, git-ignored directory (`./uploads`) will be created at the root of the backend project.
*   **Authentication:** Use a library-based approach with JWTs (JSON Web Tokens) and the `passlib` and `python-jose` libraries in Python. This is a lightweight and standard method for securing APIs within a monolithic application.
*   **External Services:**
    *   **OpenAI API:** Required for the core contract analysis feature.
    *   **Google Docs API:** Required for generating redlined documents in Google Docs format. This will require setting up OAuth 2.0 credentials.

### 1.4. Integration and API Strategy

*   **API Style:** REST. All APIs will be versioned from the start (e.g., `/api/v1/...`).
*   **Standard Formats:**
    *   **Success Response:** `{ "status": "success", "data": { ... } }`
    *   **Error Response:** `{ "status": "error", "message": "Descriptive error message" }`

## 2. Detailed Module Architecture

The application will be structured into logical, domain-driven modules within the monolith.

### 2.1. Module Identification

*   **`UserModule` (Backend):**
    *   **Responsibilities:** Manages user registration, login, and profile data. Handles authentication and JWT generation.
    *   **Database:** Controls the `users` collection.
*   **`ContractModule` (Backend):**
    *   **Responsibilities:** Handles contract uploading, parsing, and storage. Orchestrates the analysis and redlining process by calling the `AnalysisModule`. Manages contract metadata.
    *   **Database:** Controls the `contracts` collection.
*   **`AnalysisModule` (Backend):**
    *   **Responsibilities:** Contains the core business logic. Interfaces with the external AI service (e.g., OpenAI) to identify clauses, generate summaries, and create redline suggestions. Manages the logic for role-based analysis ("user" vs. "provider").
    *   **Database:** Does not directly own a collection but reads from the `contracts` collection.
*   **`FrontendApp` (Frontend):**
    *   **Responsibilities:** Manages all UI pages, components, and user interactions. Handles API calls to the backend, state management, and rendering the analysis report.
*   **`SharedModule` (Shared):**
    *   **Responsibilities:** A place for shared utilities, type definitions (if using TypeScript), and constants that might be used across different modules in the future. For the monolith, this will primarily live in the frontend for UI components and types.

### 2.2. Key Module Design (Illustrative)

*   **`ContractModule` Folder Structure (backend/app/contracts):**
    *   `router.py`: Defines the API endpoints (e.g., `POST /contracts/upload`).
    *   `service.py`: Contains the business logic for handling uploads and orchestrating analysis.
    *   `models.py`: Defines the Pydantic models for contract data.
    *   `repository.py`: Implements the data access logic using the Repository Pattern to interact with the `contracts` collection in MongoDB.

## 3. Tactical Sprint-by-Sprint Plan

The project will be developed in a series of sprints, each delivering a complete, testable feature.

### Sprint S0: Project Foundation & Setup

*   **Sprint ID & Name:** S0: Project Foundation & Setup
*   **Project Context:** This project is to build an AI-powered service that automates the initial contract review and redlining process for SaaS agreements.
*   **Goal:** To establish a fully configured, runnable project skeleton on the local machine, with all necessary credentials and basic styling configured, enabling rapid feature development in subsequent sprints.
*   **Tasks:**
    1.  **Developer Onboarding & Repository Setup:**
        *   Ask the developer for the URL of their new, empty GitHub repository for this project.
    2.  **Collect Secrets & Configuration:**
        *   Ask the user to provide the connection string for their MongoDB Atlas free-tier cluster.
        *   Ask the user for their OpenAI API key.
        *   Ask the user to set up Google Cloud credentials for the Google Docs API and provide the necessary JSON key file.
        *   Ask the user for the primary and secondary color hex codes for the UI theme.
    3.  **Project Scaffolding:**
        *   Create a monorepo structure with `frontend` and `backend` directories.
        *   Initialize a Git repository and create a comprehensive `.gitignore` file at the root.
    4.  **Backend Setup (Python/FastAPI):**
        *   Set up a Python virtual environment inside the `backend` directory.
        *   Install FastAPI, Uvicorn, Pydantic, python-dotenv, motor (for async MongoDB), `python-docx`, `pypdf`.
        *   Create a basic file structure: `main.py`, `requirements.txt`.
        *   Create `backend/.env.example` and `backend/.env`. Populate `backend/.env` with the `DATABASE_URL`, `OPENAI_API_KEY`, and path to the `GOOGLE_CREDS_JSON`.
    5.  **Frontend Setup (Next.js & shadcn/ui):**
        *   Scaffold the frontend application using `create-next-app` in the `frontend` directory.
        *   Use the `npx shadcn-ui@latest init` command to initialize shadcn/ui.
        *   Configure the `tailwind.config.js` file with the primary and secondary colors provided by the user.
        *   Create `frontend/.env.local.example` and `frontend/.env.local` for any client-side environment variables (e.g., `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000`).
    6.  **Documentation:**
        *   Create a `README.md` file at the project root. Populate it with the project context, technology stack, and setup instructions.
    7.  **"Hello World" Verification:**
        *   **Backend:** Create a `/api/v1/health` endpoint that returns `{"status": "ok"}`. Implement the initial database connection logic to MongoDB Atlas, ensuring it connects on startup.
        *   **Frontend:** Create a basic page that fetches data from the backend's `/api/v1/health` endpoint and displays the status.
        *   **User Test:** Ask the user to run the frontend and backend and verify that the "Status: ok" message appears on the web page, and the backend console shows a successful database connection.
    8.  **Final Commit:**
        *   After the user confirms the "Hello World" test is successful, stage all the created files.
        *   Confirm with the user that it's okay to make the first push to the repository.
        *   Commit the initial project structure and push to the `main` branch on GitHub.
*   **Verification Criteria:** The developer can clone the repository, follow the `README.md` to install dependencies and set up environment variables, run both frontend and backend servers, and see a "Status: ok" message on the frontend. All code is on the `main` branch of the provided GitHub repository.

### Sprint S1: User Authentication & Profiles

*   **Sprint ID & Name:** S1: User Authentication & Profiles
*   **Project Context:** This sprint builds the foundational user authentication system, which is critical for all personalized features.
*   **Previous Sprint's Accomplishments:** Sprint S0 established a local development environment. The Next.js frontend and FastAPI backend are running and can communicate. A connection to MongoDB Atlas is established. The codebase is on the `main` branch in a GitHub repository.
*   **Goal:** To implement a complete, secure user registration and login system using JWTs.
*   **Relevant Requirements & User Stories:**
    *   "As a new visitor, I want to be able to sign up for an account using my email and a secure password."
    *   "As a returning user, I want to be able to log in with my credentials to securely access my personal dashboard."
*   **Tasks:**
    1.  **Database Model:**
        *   Define a Pydantic model for the `User` collection in the backend (e.g., `id`, `email`, `hashed_password`, `createdAt`).
    2.  **Backend: Registration Logic:**
        *   Add `passlib[bcrypt]` and `python-jose` to `requirements.txt`.
        *   Implement the `POST /api/v1/auth/register` endpoint. It should take an email and password, hash the password, and create a new user in the database.
        *   **User Test:** Ask the user to test this endpoint using the auto-generated FastAPI docs (`/docs`) and verify the new user appears correctly in the MongoDB Atlas collection with a hashed password.
    3.  **Backend: Login Logic:**
        *   Implement the `POST /api/v1/auth/login` endpoint. It should verify credentials and return a JWT access token.
        *   **User Test:** Ask the user to test this endpoint with both correct and incorrect credentials.
    4.  **Backend: Protected Route:**
        *   Create authentication middleware/dependency in FastAPI to validate JWTs.
        *   Create a protected endpoint `GET /api/v1/users/me` that requires a valid token and returns the current user's data.
        *   **User Test:** Ask the user to test this endpoint with and without a valid token.
    5.  **Frontend: UI Pages & State Management:**
        *   Using shadcn/ui components, build the UI for a login page and a register page.
        *   Build a placeholder dashboard/profile page.
        *   Set up global state management for the user session (e.g., using React Context or Zustand).
        *   **User Test:** Ask the user to review the pages in the browser and confirm the look and feel.
    6.  **Frontend: End-to-End Integration:**
        *   Implement client-side forms with validation for login and registration that call the backend endpoints.
        *   Implement logic to store the JWT in `localStorage` and update the global state upon successful login.
        *   Implement logic to protect the dashboard page from unauthenticated access (redirect to `/login`).
        *   The dashboard page should fetch and display the user's email from the `/api/v1/users/me` endpoint.
        *   **User Test:** Ask the user to perform a full end-to-end test: register, get redirected to login, be taken to the protected dashboard page, see their email, and log out.
    7.  **Final Commit:**
        *   After the user confirms all functionality is working, confirm with the user that the sprint is complete.
        *   Commit all changes with a descriptive message (e.g., "feat: implement user authentication and profiles") and push the `main` branch to GitHub.
*   **Verification Criteria:** A user can register, log in, view a protected dashboard page, and log out. Unauthenticated users are redirected from protected pages. User data is correctly stored and secured in MongoDB. All code is on the `main` branch.

### Sprint S2: Core Document Analysis Workflow

*   **Sprint ID & Name:** S2: Core Document Analysis Workflow
*   **Project Context:** This sprint implements the central feature of the application: uploading a contract and receiving an AI-powered analysis.
*   **Previous Sprint's Accomplishments:** A full user authentication system is in place. Users can register, log in, and view a protected dashboard.
*   **Goal:** To allow a logged-in user to upload a `.docx` or `.pdf` file, specify their role, and view a generated analysis report.
*   **Relevant Requirements & User Stories:**
    *   "As a user, I can upload a SaaS contract so that I can initiate the review process."
    *   "As a user, I can indicate my company’s role (user or provider)... so the system can generate... analysis."
    *   "As a user, I can receive an analysis report so I can quickly understand the contract's stance on major negotiation points."
*   **Tasks:**
    1.  **Database Model:**
        *   Define a Pydantic model for the `Contract` collection (e.g., `id`, `userId`, `filename`, `role`, `status`, `analysisReport`, `createdAt`).
    2.  **Backend: File Upload Endpoint:**
        *   Implement a protected endpoint `POST /api/v1/contracts/upload`.
        *   It should accept a file upload (`.docx`, `.pdf`), the user's role ("user" or "provider"), and save the file to the local `./uploads` directory.
        *   Create a new `Contract` document in the database linked to the user.
        *   **User Test:** Ask the user to test uploading a file via the frontend and verify it appears in the `./uploads` folder and a corresponding record is in the `contracts` collection.
    3.  **Backend: Analysis Service:**
        *   Create an `AnalysisService` that takes a contract's text and the user's role.
        *   Implement the logic to call the OpenAI API with a carefully crafted prompt. The prompt should instruct the model to identify key clauses, summarize them, and note non-standard clauses, all from the perspective of the specified role.
        *   Parse the structured JSON response from the AI model.
    4.  **Backend: Orchestration & API:**
        *   Update the upload logic to asynchronously trigger the `AnalysisService` after a successful upload.
        *   Update the `Contract` document in the database with the analysis report once complete.
        *   Create a protected endpoint `GET /api/v1/contracts/{contract_id}` to fetch the contract details, including the analysis report.
    5.  **Frontend: Upload UI:**
        *   On the user dashboard, create a file upload component using shadcn/ui components. Include a radio button group for selecting the role ("User" or "Provider").
        *   Implement the API call to the upload endpoint.
    6.  **Frontend: Analysis Report UI:**
        *   Create a dynamic page `/contracts/[id]` to display the analysis report.
        *   The page should fetch the contract data and render the report in a clear, readable format (e.g., using Cards and Accordions from shadcn/ui for each clause).
        *   Show a loading state while the analysis is in progress.
        *   **User Test:** Ask the user to perform the full flow: upload a sample SaaS contract, select a role, wait for the analysis, and view the generated report. Confirm the report is sensible and reflects the content of the document.
    7.  **Final Commit:**
        *   After the user confirms the full analysis workflow is functional, confirm with the user that the sprint is complete.
        *   Commit all changes (e.g., "feat: implement core contract analysis workflow") and push to GitHub.
*   **Verification Criteria:** A logged-in user can upload a contract, specify their role, and view a detailed analysis report. The report correctly identifies and summarizes key clauses from the document. All code is on the `main` branch.