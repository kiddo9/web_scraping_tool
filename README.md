# 🔸 Web Scraping Tool

## 📌 Overview

This is a **Web Scraping Tool** designed to extract structured data from websites at multiple levels of detail. It features both a **backend server** for processing and a **frontend interface** for user interaction.

---

## 🛠️ Technologies Used

- **Frontend**

  - HTML5
  - CSS3
  - JavaScript

- **Backend**

  - Node.js
  - TypeScript
  - Express.js
  - Cheerio

---

## ✨ Features

- ✅ Interactive UI to submit URLs or search queries.
- ✅ Displays extracted data in a readable format.
- ✅ Accepts:

  - a **search query** (e.g., company name)
  - a **single URL**
  - multiple **seed URLs**

- ✅ Stores data in both **JSON** and **CSV** formats.
- ✅ Input validation to prevent invalid requests.
- ✅ Robust error handling to manage failed requests or invalid pages.

---

## 🧠 Extraction Levels

This tool offers **three levels of data insight**:

### 🔹 Level 1: Basic Info

- Company name
- Website URL
- Contact information (emails, phone numbers)

### 🔸 Level 2: Enhanced Details

- Social media profile links
- Location (physical or regional)
- Company description
- Products or services
- Market sector or industry

### 🔸 Level 3: Comprehensive Insight

- Tech stack used
- Market positioning
- Estimated company size

> **Design Decision**: The levels were introduced to modularize data extraction—useful for scaling the scraper or applying resource-intensive extraction conditionally.

---

## ⚙️ Setup Instructions

### 📋 Prerequisites

Ensure the following tools are installed:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/)
- Live Server extension (optional, for frontend testing)

### 🗒️ Steps to Set Up

1. **Clone the repository**:

   ```bash
   git clone https://github.com/kiddo9/web_scraping_tool.git
   ```

2. **Open the folder in VSCode**:

   ```bash
   code web_scraping_tool
   ```

3. **Navigate to the server directory**:

   ```bash
   cd server
   ```

4. **Install dependencies**:

   ```bash
   npm install
   ```

5. **Create a `.env` file** in the `server` directory:

   ```
   PORT=3000
   ```

> ⚠️ Make sure your `.env` file is created in the **`server/`** folder.

---

## 🚀 Execution Instructions

### 💻 Run Backend

Inside the `server` directory, start the backend:

```bash
npm run dev
```

### 🌐 Run Frontend

Use the **Live Server extension** in VSCode to open and run the `index.html` file located in the `client` directory (or root if there is no folder separation).

---

## 🧩 Assumptions & Design Decisions

- **Modular Levels**: The three extraction levels allow customization and scaling—more advanced scrapes only run when needed.
- **Cheerio** was chosen for its lightweight DOM traversal capabilities, suitable for static HTML scraping.
- **No Headless Browser**: This scraper assumes **no JavaScript-rendered pages**. Future versions could integrate Puppeteer/Playwright for dynamic content.
- **Flat Data Storage**: JSON and CSV formats are used for simple downstream integration with spreadsheets, data platforms, or analytics.
- **Frontend Simplicity**: A simple vanilla JS UI keeps dependencies low and enables quick testing.

---

## 📬 Feedback & Contributions

Suggestions, issues, or feature requests? Feel free to open an issue or submit a pull request.
