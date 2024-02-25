import { db } from '../connect.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MAX_AGE as maxAge } from '../utils/constants.js';
import { generateOtp } from '../utils/otp.js';
import { emailQueue } from '../utils/emailQueue.js';
import { registrationEmail } from '../email-templates/registrationEmail.js';
import { forgotPasswordEmail } from '../email-templates/forgotPasswordEmail.js';



export const register = (req, res) => {
  console.log('register');
  //CHECK IF USER EXISTS
  const q = 'SELECT * FROM users WHERE username = ? OR email = ?';
  db.query(q, [req.body.username, req.body.email], (err, data) => {
    if (err) return res.status(500).json({ message: 'Server Error' });
    if (data.length > 0) return res.status(409).json({ message: 'user already exists' });

    //SEND OTP TO EMAIL
    const otp = generateOtp().toString();
    const salt = bcrypt.genSaltSync(10);
    const otpHash = bcrypt.hashSync(otp, salt);
    const passHash = bcrypt.hashSync(req.body.password, salt);

    const user = {
      username: req.body.username,
      email: req.body.email,
      password: passHash,
      otp: otpHash,
      name: req.body.name
    };

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '10m' });
    res.cookie('jwtToken', token, { httpOnly: true, maxAge: 10 * 60 * 1000 });

    const emailContent = registrationEmail(req.body.name, otp);

    const payLoad = { to: req.body.email, subject: 'OTP for Verification', html: emailContent };
  
    emailQueue.add('send-email', payLoad);
    return res.status(200).json({ message: 'OTP sent to email' });  
  })
}

export const verifyEmail = (req, res) => {
  //CREATE A NEW USER IF NEW EMAIL IS VERIFIED
  const { jwtToken } = req.cookies;
  if (!jwtToken) return res.status(401).json({ message: 'Token expired' });
  const { otp } = req.body;
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    console.log(user);
    const cookieOtpHash = user.otp;
    // Use bcrypt.compareSync to compare the OTP with the hashed OTP
    const isMatch = bcrypt.compareSync(otp, cookieOtpHash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid OTP' });

    //INSERT INTO DB
    const q = 'INSERT INTO users (`username`,`email`,`password`,`name`) VALUES (?,?,?,?)';
    const values = [user.username, user.email, user.password, user.name];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json({ message: 'Server Error' });
      return res.status(200).json({ message: 'user created' });
    });
  });
}

export const login = (req, res) => {
  const q = 'SELECT * FROM users WHERE username = ? OR email = ?';
  db.query(q, [req.body.usernameOrEmail, req.body.usernameOrEmail], (err, data) => {
    if (err) return res.status(500).json({ message: 'Server Error' });
    if (data.length === 0) return res.status(404).json({ message: 'user not found' });

    const user = data[0];
    console.log(user);
    if (!user) return res.status(404).json({ message: 'user not found' });
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'invalid email or password' });

    const { password, ...others } = user;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.cookie('accessToken', token, { httpOnly: true, maxAge }).status(200).json(others);
  });
}
export const googleAuth = (req, res) => {
  console.log(req.body);
  db.execute('SELECT * FROM users WHERE email = ?', [req.body.email], (err, users) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }

    // IF USER IS ALREADY PRESENT
    if (users.length > 0) {
      console.log(`User already exists`);
      const user = users[0];
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      const { password, ...others } = user;
      res.cookie("accessToken", token, { httpOnly: true, maxAge }).status(200).json(others);
    } else {
      let insertQuery = 'INSERT INTO users SET';
      let values = [];

      for (let key in req.body) {
        if (req.body[key] !== undefined) { // Add this check
          insertQuery += ` \`${key}\` = ?,`;
          values.push(req.body[key]);
        }
      }

      // Remove the trailing comma from the query string
      insertQuery = insertQuery.slice(0, -1);

      // CREATE NEW USER
      console.log(`Creating new user`);
      db.execute(insertQuery, values, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: 'Server Error' });
        } else {
          db.execute('SELECT * FROM users WHERE id = ?', [result.insertId], (err, users) => {
            if (err) {
              return res.status(500).json({ message: 'Server Error' });
            } else {
              const newUser = users[0];
              const { password, ...others } = newUser;
              const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
              res.cookie("accessToken", token, { httpOnly: true, maxAge }).status(200).json(others);
            }
          });
        }
      });
    }
  });
};

export const logout = (req, res) => {
  res.clearCookie('accessToken', {
    secure: true,
    sameSite: 'none'
  }).status(200).json({ message: 'user has been logged out' });
}


export const forgotPassword = (req, res) => {
  const { email } = req.body;
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    const user = data[0];
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
    const emailContent = forgotPasswordEmail(resetLink);

    const payLoad = { to: email, subject: 'Password Reset', html: emailContent };
    emailQueue.add('send-fp-link', payLoad);
    return res.status(200).json({ message: 'Password reset link sent' });
  });
};

export const resetPassword = (req, res) => {
  const { token, newPassword } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });

    const q = "SELECT * FROM users WHERE id = ?";

    db.query(q, [decodedUser.id], (err, data) => {
      if (err) return res.status(500).json(err);
      const user = data[0];
      if (!user) return res.status(404).json({ message: 'User not found' });

      bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json(err);

        const q = "UPDATE users SET password = ? WHERE id = ?";

        db.query(q, [hashedPassword, user.id], (err, result) => {
          if (err) return res.status(500).json(err);
          res.status(200).json({ message: 'Password reset successful' });
        });
      });
    });
  });
};