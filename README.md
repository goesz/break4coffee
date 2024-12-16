# Break4Coffee ☕

Break4Coffee is an online coffee shop where users can browse products, make purchases, and read articles about home coffee preparation. Built as a full-stack web application, it aims to provide a friendly and informative experience for coffee enthusiasts.

## Features

- **User Authentication**: Secure login system with password encryption using `bcrypt`.
- **Product Catalog**: Browse and select items available for purchase.
- **Articles Section**: Access articles on home coffee preparation techniques and coffee culture.
- **User Account**: View balance, account details, and transaction history.

## Tech Stack

### Backend
- **Node.js** with **TypeScript** for server-side development
- **Prisma** ORM for interacting with **MongoDB**
- **bcrypt** for secure password encryption

### Frontend
- **React** with **Tailwind CSS** for UI design

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/goesz/break4coffee.git

## Environment Variables
Configure the environment variables required for MongoDB in .env files.

## Database
This project uses MongoDB as the database with Prisma ORM to manage and interact with the data models.

## Security
Passwords are hashed with bcrypt to ensure user security.

## Disclaimer
Important: This project uses Session Storage to store user data during a session. I acknowledge that this approach is not recommended due to its vulnerabilities, such as data exposure on the client side and lack of protection against XSS (Cross-Site Scripting) attacks. The purpose of this implementation was to demonstrate the risks of client-side data manipulation during a presentation for my class.

Now that the project is complete, my next step is to implement JWT (JSON Web Tokens) for secure user authentication and to store relevant user information, such as the user ID.
