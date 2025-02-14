# React + TypeScript + Vite

<!-- This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

NOTE: To avoid CORS errors by NEW YORK TIMES API and NEWSAPI, I have to setup a node server.ts

Step to start the server
1. cd server
2. npm install (install all dependencies)
3. npm run dev (http://localhost:5000/api/news) -->

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

🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/your-repo/innoscripta-case-study.git
cd innoscripta-case-study

2️⃣ Setup the Backend (Express Proxy)
cd server
npm install

🔹 Create an .env file in server/ and add:
PORT=5000
NYTIMES_API_KEY=your_nytimes_api_key
NEWSAPI_API_KEY=your_newsapi_api_key
GUARDIAN_API_KEY=your_guardian_api_key
NEWSAPI_BASE_URL=your_newsapi_base_uri
NYTIMES_BASE_URL=your_nytimes_base_url
GUARDIAN_BASE_URL=your_guardian_base_url

Start the Backend
npm run dev

Server will start on http://localhost:5000/api/news


3️⃣ Setup the Frontend (React + Vite)
cd ../
npm install

🔹 Start the Frontend
npm run dev


🛠 API Endpoints (Proxy Server)
GET /api/news	Fetches general news
GET /api/news?q=tesla	Fetches articles related to "tesla"
GET /api/news?category=business	Fetches business news
GET /api/news?from=2024-02-01&to=2024-02-10	Fetches news from a specific date range

❓ Troubleshooting
CORS Issues
Ensure the backend proxy is running before starting the frontend.
If using a different port, update the frontend API URL accordingly.

API Key Errors
Double-check .env files and ensure API keys are correct.





