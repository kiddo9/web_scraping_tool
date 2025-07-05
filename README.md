# web scraping tool

## Description

This is a web scarapting tool built with:

1. HTML5
2. CSS3
3. JavaScript
4. Typescript
5. Nodejs
6. cheerio
7. Express.js

## Features and Extraction level

The tool has the following features:

- UI for interacting with the backend server.
- displays scraped data.
- Accepts search query, single url and a set of seed URLS.
- stores information in both json and csv file.
- input validation
- Error handling

This tool has 3 extraction levels

- **Level 1 or Basic:**
  this includes details like company name, website url and contact information

- **Level 2 or Enhanced Details:**
  this includes details like Social media profile links, location, Company description, products offered and narket sector.

- **Level 3 or comprehensive insight:**
  this includes details like Tech Stack, market position, Company size.

## Setup and Execution Instructions

## Prerequirments

To be able to run this application soomthly, you should have:

- Vscode [Download VSCode](https://code.visualstudio.com/)
- Node [Download Node](https://nodejs.org/)
- Live server vscode extension(optional)

## Setup instruction

- Clone the repo:

```
    git clone https://github.com/kiddo9/web_scraping_tool.git
```

- Open folder in vscode:

```
    code web_scraping_tool
```

- Open the Terminal on your vscode and run the following

```
    cd sever
```

```
    npm install
```

this will install all the packages that the application needs to run

- Create a .env file:
  after creating the file inside your server folder assign your port.

```
    PORT=3000
```

## Execution Instruction

After setting up the code base, open your terminal on your vs code and start your backend server by running:

```
    npm run dev
```

make sure your inside the server directory before running the command above.

```
    cd sever
```

ones that's done using the live server extension run the html file.
