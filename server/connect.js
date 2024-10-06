import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

export const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT
});

db.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('connected to MySQL DB!');
});


export const initDb = async () => {
  db.execute(`CREATE DATABASE IF NOT EXISTS social`)

  db.query(`USE social`);

  db.execute(`
  CREATE TABLE IF NOT EXISTS social.users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(100) NOT NULL,
      coverPic TEXT,
      profilePic TEXT,
      city VARCHAR(100),
      website VARCHAR(255),
      fromGoogle BOOLEAN DEFAULT FALSE
  )
`);

  db.execute(`
  CREATE TABLE IF NOT EXISTS social.posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      \`desc\` TEXT,
      img TEXT,
      userId INT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) 
          REFERENCES social.users(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE
  )
`);

  db.execute(`
  CREATE TABLE IF NOT EXISTS social.likes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL,
      postId INT NOT NULL,
      FOREIGN KEY (userId) 
          REFERENCES social.users(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE,
      FOREIGN KEY (postId) 
          REFERENCES social.posts(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE
  )
`);

  db.execute(`
  CREATE TABLE IF NOT EXISTS social.comments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      \`desc\` TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      userId INT NOT NULL,
      postId INT NOT NULL,
      FOREIGN KEY (userId) 
          REFERENCES social.users(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE,
      FOREIGN KEY (postId) 
          REFERENCES social.posts(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE
  )
`);

  db.execute(`
  CREATE TABLE IF NOT EXISTS social.stories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      img TEXT,
      userId INT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) 
          REFERENCES social.users(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE
  )
`);

  db.execute(`
  CREATE TABLE IF NOT EXISTS social.relationships (
      id INT AUTO_INCREMENT PRIMARY KEY,
      followerUserId INT NOT NULL,
      followedUserId INT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (followerUserId) 
          REFERENCES social.users(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE,
      FOREIGN KEY (followedUserId) 
          REFERENCES social.users(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE
  )
`);
}
