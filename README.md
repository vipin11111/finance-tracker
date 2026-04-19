# Smart Personal Finance Tracker

A modern, responsive web application for tracking your personal finances, built with React, Vite, and Firebase.

## Live Demo
🚀 **[View Live App on Netlify](https://69e4ad5b4b42cf01354a3d4a--meek-madeleine-23dea1.netlify.app/)**

## Features
- **Dashboard Overview**: Get a quick glance at your total balance, income, and expenses.
- **Transaction Management**: Add income or expenses with customizable categories.
- **Data Visualization**: Visualize your spending habits with interactive pie and line charts.
- **Budget Tracking**: Set a monthly budget and monitor your progress.
- **AI Insights**: (If configured) Get personalized financial tips based on your spending patterns.
- **Export Data**: Export your transactions to a CSV file.

## Technologies Used
- Frontend: React, Vite
- Styling: Custom CSS (Glassmorphism design)
- Charts: Recharts
- Icons: Lucide React
- Backend/Auth: Firebase (Firestore & Authentication)

## Getting Started Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/vipin11111/finance-tracker.git
   ```
2. Navigate to the project directory:
   ```bash
   cd finance-tracker
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Configuration
To use the AI features, you need to add your Gemini API key to a `.env` file:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```
