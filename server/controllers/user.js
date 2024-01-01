import { db } from '../connect.js';
import jwt from 'jsonwebtoken';

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const user = data[0];
    if (!user) return res.status(404).json({ message: 'user not found' });
    const { password, ...others } = user;
    res.status(200).json(others);
  });
}
export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: 'Not logged in' });
  console.log('updateUser');

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json({ message: 'Session Expired' });

    let q = 'UPDATE users SET';
    let values = [];

    if (req.body.name) {
      q += ' `name` = ?,';
      values.push(req.body.name);
    }

    if (req.body.city) {
      q += ' `city` = ?,';
      values.push(req.body.city);
    }

    if (req.body.website) {
      q += ' `website` = ?,';
      values.push(req.body.website);
    }

    if (req.body.profilePic) {
      q += ' `profilePic` = ?,';
      values.push(req.body.profilePic);
    }

    if (req.body.coverPic) {
      q += ' `coverPic` = ?,';
      values.push(req.body.coverPic);
    }

    // Remove the trailing comma from the query string
    q = q.slice(0, -1);

    // Add the WHERE clause to the query and push the ID to the values array
    q += ' WHERE `id` = ?';
    values.push(userInfo.id);

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json({ message: 'Server Error' });
      if (data.affectedRows === 0) return res.status(400).json({ message: 'You can update only your profile' });
      return res.status(200).json({ message: 'Profile has been updated' });
    })
  });

}

export const getLikedPosts = (req, res) => {
  const userId = req.query.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const offset = (page - 1) * limit;

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: 'Not logged in' });

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json({ message: 'Session Expired' });

    const q = `
      SELECT p.*, u.id AS userId ,u.name AS userName ,u.profilePic AS userProfilePic
      FROM social.likes AS l
      JOIN social.posts AS p ON l.postId = p.id
      JOIN social.users AS u ON p.userId = u.id
      WHERE l.userId = ?
      ORDER BY p.createdAt DESC
      LIMIT ? OFFSET ?
    `;
    const values = [userId, limit, offset];

    db.query(q, values, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' });
      } else {
        res.status(200).json(data);
      }
    });
  });
};