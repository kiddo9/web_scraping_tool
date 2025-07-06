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

- ✅ Interactive UI to submit URLs.
- ✅ Displays extracted data in a readable format.
- ✅ Accepts:

  - multiple **seed URLs**

- ✅ Stores data in both **JSON** formats.
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

### ✅ Usage and Testing

1. **Open the HTML file** in your browser  
   _Tip: You can use the Live Server extension in VSCode for easier testing._

2. In the **textarea**, enter a list of seed URLs  
   _Each URL should be on a new line._

3. Click the **"Start Scrape"** button to begin scraping.

4. The **scraped results** will be displayed on the page once the process is complete.

5. Click the **"Save"** button to store the extracted company data in the `storage.json` file.

> 💾 All saved data is appended to `storage.json` and stored in structured JSON format.

---

### JSON response generated

```
[
  {
    "name": "1% Studio",
    "emails": [
      "hello@1percnt.com"
    ],
    "phones": [],
    "socialMedia": [
      "https://www.instagram.com/1.percnt",
      "https://youtube.com/@1percntstudio",
      "https://www.instagram.com/wearthirsty",
      "https://www.instagram.com/snowbunnyworld",
      "https://www.instagram.com/davido",
      "https://www.instagram.com/fwtriads",
      "https://www.instagram.com/gocrazy.wby",
      "https://www.instagram.com/streetsouk",
      "https://www.instagram.com/straffitti"
    ],
    "location": "",
    "industry": "media",
    "describe": "1% Studio is a premier multimedia creative, consulting, and production company partnering with brands and artists to deliver exceptional content. Join our team as an intern video editor!",
    "url": "https://www.1percnt.com/contact",
    "products": [],
    "techStack": [
      "js"
    ]
  },
  {
    "name": "Jumia Nigeria",
    "emails": [],
    "phones": [
      "702890399",
      "718362032",
      "0700-600-0000",
      "02018883300",
      "1160 20000",
      "148127000",
      "02018881106",
      "01 8881100",
      "489867790496"
    ],
    "socialMedia": [
      "/mi-netflix-prime-video-youtube-installed-mxq-pro-smart-box-with-mi-32-led-tv-393712107.html",
      "https://www.facebook.com/jumia.com.ng/",
      "https://www.youtube.com/c/JumiaNigeriaNG",
      "https://www.instagram.com/jumianigeria/",
      "https://twitter.com/JumiaNGHelp"
    ],
    "location": "",
    "industry": "online shopping",
    "describe": "Jumia Nigeria the #1 of Online Shopping in Nigeria - Shop Online All Products : Smartphones, Appliances, Clothing... ✓ Top Brands :  Samsung, Xiaomi, Adidas... ✓ Best prices in Nigeria ✓ Order now and enjoy pay on delivery !",
    "url": "https://www.jumia.com/",
    "products": [
      "Service Center",
      "How to return a product on Jumia?",
      "Report a Product"
    ],
    "techStack": [
      "js"
    ]
  }
]
```

## 🧩 Assumptions & Design Decisions

- **Modular Levels**: The three extraction levels allow customization and scaling—more advanced scrapes only run when needed.
- **Cheerio** was chosen for its lightweight DOM traversal capabilities, suitable for static HTML scraping.
- **No Headless Browser**: This scraper assumes **no JavaScript-rendered pages**. Future versions could integrate Puppeteer/Playwright for dynamic content.
- **Flat Data Storage**: The scraped data are stored in a JSON file.
- **Frontend Simplicity**: A simple vanilla JS UI keeps dependencies low and enables quick testing.

---

## 📬 Feedback & Contributions

Suggestions, issues, or feature requests? Feel free to open an issue or submit a pull request.
