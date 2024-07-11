# Shipping Quote Calendar Management System

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Folder Structure](#folder-structure)
7. [State Management](#state-management)
8. [Components](#components)
9. [Styling](#styling)
10. [Contributing](#contributing)
11. [License](#license)

## Overview
The Shipping Quote Calendar Management System is a web application designed to manage and display shipping quotes. It allows users to view quotes for each day of the month.

## Features
- Mobile-first design
- Display quotes per day
- Interactive calendar view
- State management with Redux Toolkit and Redux Saga

## Tech Stack
- **React**: Frontend library for building user interfaces
- **TypeScript**: Typed JavaScript for better development experience
- **Tailwind CSS**: Utility-first CSS framework
- **Redux Toolkit**: State management
- **Redux Saga**: Side effect management

## Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/ludten/oneport_quote_mgmt.git
   cd oneport_quote_mgmt

2. **Install dependencies:**
   ```sh
   npm install

3. **Start the development server:**
   ```sh
   npm run dev

## Usage
To use the application, follow these steps:

  1. Open your browser and navigate to http://localhost:3001.
  2. Interact with the calendar to view shipping quotes.

## Folder Structure
```md
src
├── App.tsx
├── assets
│   ├── css
│   └── img
│       ├── add-symbol.svg
│       ├── close.svg
│       ├── delete.png
│       ├── download.png
│       ├── oneport365.png
│       ├── react.svg
│       ├── sun-color-icon.svg
│       └── trash.svg
├── common
│   ├── error.tsx
│   ├── inputs
│   │   ├── currencySelect.tsx
│   │   ├── genericInput.tsx
│   │   ├── selectInput.tsx
│   │   └── textInput.tsx
│   ├── loader.tsx
│   ├── modals
│   │   ├── calendarQuotes.tsx
│   │   ├── createQuote.tsx
│   │   ├── draftQuoteDetails.tsx
│   │   ├── quoteDetails.tsx
│   │   ├── sectionCurrency.tsx
│   │   └── timeSetter.tsx
│   ├── quoteCurrency.tsx
│   └── tables
│       ├── breakdownTableMobile.tsx
│       ├── breakdownTable.tsx
│       ├── sectionTableMobile.tsx
│       └── sectionTable.tsx
├── config.ts
├── data
│   └── currency.ts
├── helper
│   ├── loader.ts
│   ├── print.ts
│   ├── serverops.ts
│   └── utils.ts
├── index.css
├── main.tsx
├── pages
│   ├── calendar.tsx
│   ├── editDraftQuote.tsx
│   ├── editQuote.tsx
│   ├── index.tsx
│   └── newQuote.tsx
├── routes
│   └── index.tsx
├── store
│   ├── localStorage.ts
│   ├── rootStore.ts
│   ├── sagas
│   │   ├── quoteSaga.ts
│   │   ├── quotesSaga.ts
│   │   └── rootSaga.ts
│   └── slice
│       ├── AppSlice.ts
│       ├── draftQuotesSlice.ts
│       └── QuoteSlice.ts
├── types
│   ├── AppType.ts
│   ├── QuoteType.ts
│   └── ResponseType.ts
└── vite-env.d.ts
```

## State Management
State management is handled using Redux Toolkit and Redux Saga. The state is divided into slices for better modularity. Here's an example structure:

  - Quotes Slice: Manages quotes data, including fetching and storing quotes.
  - Quote Slice: Manages a quote data, including fetching and storing the quote.
  - Draft Quote Slice: Manages draft quotes data.

## Components
The application is divided into several components to maintain modularity and reusability. Key components include:

  - Calendar: Displays the calendar view with quotes.
  - EditDraftQuote: Edit and save a draft quote.
  - EditQuote: Edit and save a quote.
  - NewQuote: Create and edit a quote.

## Styling
Styling is achieved using Tailwind CSS, following a mobile-first approach. The application is designed to be responsive and supports a minimum width of 320px. Custom styles and configurations are defined in the styles folder.

## Contributing
Contributions are welcome! To contribute, follow these steps:
  1. **Fork the repository.**
  
  2. **Create a new branch:**
     ```sh
      git checkout -b feature/your-feature-name  
  3. **Make your changes and commit them:**
     ```sh
     git commit -m 'Add some feature'
  4. **Push to the branch:**
     ```sh
     git push origin feature/your-feature-name
  5. **Open a pull request.**

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

