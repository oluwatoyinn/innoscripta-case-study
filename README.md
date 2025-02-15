# React + TypeScript + Vite

News Aggregator App
A React + TypeScript news aggregator that fetches articles from the New York Times, NewsAPI and Guardian API, allowing users to search, filter, and browse the latest news.

🔹 Why Use a Backend Proxy?
Both the New York Times API and NewsAPI enforce CORS restrictions, meaning they block direct requests from the frontend. To bypass this:
I use an Express.js proxy server that acts as a bridge between the frontend and external APIs. The frontend sends requests to the proxy, which then fetches the data securely.
This avoids CORS issues while keeping API keys secure

📌 Tech Stack
Frontend (React + Vite)
TypeScript
Tailwind CSS

Backend (Express.js)
Node.js
TypeScript
Axios (for API requests)
dotenv (for environment variables)
CORS (to enable cross-origin requests)

# NOTE: YOU CAN RUN THE PROJECT WITH OR WITHOUT DOCKER CONTAINER

## RUNNING WITH DOCKER CONTAINER

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- Docker
- Docker Compose

1. Clone the repository:

```bash
git clone https://github.com/oluwatoyinn/innoscripta-case-study.git
cd innoscripta-case-study
```

2. Environment Setup:
   - Navigate to the server directory
   - Create a `.env` file based on below

````bash
PORT=5000
NYTIMES_API_KEY=your_nytimes_api_key
NEWSAPI_API_KEY=your_newsapi_api_key
GUARDIAN_API_KEY=your_guardian_api_key
NEWSAPI_BASE_URL=your_newsapi_base_uri
NYTIMES_BASE_URL=your_nytimes_base_url
GUARDIAN_BASE_URL=your_guardian_base_url
```bash

```bash
cd server
cp .env
````

### Running the Application

1. From the root directory, build and start the containers:

```bash
docker compose up -d or make up
```

This command will:

- Build the Docker images for both client and server
- Start the containers in development mode
- Enable hot-reloading for both services

2. The applications will be available at:

```bash
   - Frontend: http://localhost:5173
   - Example Backend: http://localhost:5000/api/news?q=general
```

## RUNNING WITHOUT DOCKER CONTAINER

🚀 Getting Started
1️⃣ Clone the Repository

```bash
git clone https://github.com/oluwatoyinn/innoscripta-case-study.git
cd innoscripta-case-study
```

2️⃣ Setup the Backend (Express Proxy)

```bash
cd server
npm install
```

🔹 Create an .env file in server/ and add:

```bash
PORT=5000
NYTIMES_API_KEY=your_nytimes_api_key
NEWSAPI_API_KEY=your_newsapi_api_key
GUARDIAN_API_KEY=your_guardian_api_key
NEWSAPI_BASE_URL=your_newsapi_base_uri
NYTIMES_BASE_URL=your_nytimes_base_url
GUARDIAN_BASE_URL=your_guardian_base_url
```

🔹 Start the Backend

```bash
npm run dev
```

Server will start on http://localhost:5000/api/news

3️⃣ Setup the Frontend (React + Vite)

```bash
cd ../
npm install
```

🔹 Start the Frontend

```bash
npm run dev
```

🛠 API Endpoints (Proxy Server)

```bash
GET /api/news Fetches general news
GET /api/news?q=tesla Fetches articles related to "tesla"
GET /api/news?category=business Fetches business news
GET /api/news?from=2024-02-01&to=2024-02-10 Fetches news from a specific date range
```

❓ Troubleshooting
CORS Issues
Ensure the backend proxy is running before starting the frontend.
If using a different port, update the frontend API URL accordingly.
Failure to get news ariticles, please restart the server 

API Key Errors
Double-check .env files and ensure API keys are correct.
