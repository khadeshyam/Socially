# Socially

[![React](https://img.shields.io/badge/React-^18.2.0-blue)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/express-^4.18.2-green)](https://expressjs.com/)
[![MySQL2](https://img.shields.io/badge/mysql2-^3.3.2-navy)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v18.12.1-orange)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-v24.0.5-yellow)](https://www.docker.com/)

## Features
- Users can Register and Login
- Create and edit posts
- Like and comment on posts
- Follow and unfollow users
- See a feed of posts
- 1-1 chat

## Prerequisites

To run Socially locally, you need to have the following

- **[Node.js](https://nodejs.org/)** (>= v18.12.1)
- **[Aiven](https://console.aiven.io/signup?referral_code=tnz1kigcmz56dei7gbut)** (free account for MySQL)
- **[Cloudinary](https://cloudinary.com/)** (free account)
- **[Docker Desktop](https://www.docker.com/)** (>= v20.10.23) (optional)

**Note:** Cloudinary is a cloud-based image and video management platform that Socially uses to store and deliver images and videos. You can create a free Cloudinary account to get started.

## 🚀 Run using Node.js and MySQL

### 1. Clone the repository:
```bash
git clone https://github.com/khadeshyam/Socially.git
```
### 2. Navigate to the project's root directory.
```bash
cd Socially
``` 

### 3. Configuration of Environment Variables

To configure the environment variables for your project, follow these steps:

1. **Copy Environment Variable Template:**
   - Begin by making a duplicate of the `env.example` file provided in the project repository.
   - Rename the copied file to `.env`.

2. **Obtain Credentials:**
   - Retrieve the necessary credentials from the following services:
     - Cloudinary
     - Aiven.io (MySQL DBs)
     - Firebase
     - Your Email Provider

3. **Update Environment Variables:**
   - Open the newly created `.env` file in a text editor.
   - Populate the file with the respective credentials obtained from the services mentioned above.

### 4. Install Dependencies

To install all project dependencies, use the following command in your terminal:

  - Using Yarn:
    ```bash
    yarn
    ```
  - Using npm:
    ```bash
    npm i
    ```

### 5. Run the application in development mode
  - Run this script
    ```bash
    npm run dev
    ``` 

**Navigate to http://localhost:3000 in your web browser to view the application**

## 💻 Technologies Used

- React
- Chakra UI
- Node.js
- MySQL
- Express
- Docker

## 🤝 Contributing

Contributions to the project are always welcome. If you find any bugs or want to suggest new features, please open an issue or create a pull request.

✨ Happy coding!
