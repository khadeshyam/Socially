# Socially

[![React](https://img.shields.io/badge/React-^18.2.0-blue)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/express-^4.18.2-green)](https://expressjs.com/)
[![Express](https://img.shields.io/badge/mysql2-^3.3.2-navy)](https://www.docker.com/)
[![NodeJS](https://img.shields.io/badge/Node.js-v18.12.1-orange)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-v24.0.5-yellow)](https://www.docker.com/)

## Features
- Users can Register and Login
- Create and edit posts
- Like and comment on posts
- Follow and unfollow users
- See a feed of posts

## Prerequisites

To run Socially locally, you need to have the following

* **[Node.js](https://nodejs.org/)** (>= v18.12.1)
* **[MySQL Community Server](https://www.mysql.com/)** (>= v8.0)
* **[Cloudinary](https://cloudinary.com/)** (free account)
* **[Docker Desktop](https://www.docker.com/)** (>= v20.10.23) (optional)

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
### 3. Configuration environment variables
- create a .env.local file in client directory and add the following with your cloudinary credentaials
```bash
  REACT_APP_API_URL=http://backend:5000/api
  REACT_APP_UPLOAD_PRESET_NAME=
  REACT_APP_CLOUD_NAME=
```
- create a .env file in server directory and add the following
```bash
  MYSQL_USER=root
  MYSQL_PASSWORD=my-secret-pw
  MYSQL_HOST=db
  MYSQL_DATABASE=social
  MYSQL_PORT=3306
  JWT_SECRET=jwt-secret
``` 

### 4. Install the project's dependencies
```bash
  cd client && yarn
  cd server && yarn
``` 
### 5. Start MySQL Community Server (Windows and Unix)
- #### Windows powershell
```bash
  $env:MySQLPassword = "my-secret-pw"
  Start-Service "MySQL80"
  mysql.exe -u root -p
``` 
enter the password
- #### Unix
```bash
  export MySQLPassword=my-secret-pw
  systemctl start mysql
  mysql -u root -p
```
enter the password

### 6. Run the application
```bash
  cd client && npm start
  cd server && npm run dev
```

**Navigate to http://localhost:3000 in your web browser to view the application**

## 💻 Technologies Used

- React
- Sass
- Node.js
- MySQL
- Express
- Docker



## 🤝 Contributing

Contributions to the project are always welcome. If you find any bugs or want to suggest new features, please open an issue or create a pull request.

✨ Happy coding!