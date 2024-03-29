import { db } from '../connect.js';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export const getPosts = (req, res) => {
    const userId = req.query?.userId;
    const page = parseInt(req.query?.page) || 1;
    const limit = parseInt(req.query?.limit) || 3;
    const offset = (page - 1) * limit;

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: 'Not logged in' });

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json({ message: 'Session Expired' });

        const q = userId
            ? 'SELECT p.*,u.id AS userId ,u.name AS userName ,u.profilePic AS userProfilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.id DESC LIMIT ? OFFSET ?'
            : 'SELECT p.*,u.id AS userId ,u.name AS userName ,u.profilePic AS userProfilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) ORDER BY p.id DESC LIMIT ? OFFSET ?';
        const values = userId ? [userId, limit, offset] : [limit, offset];
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
export const addPost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: 'Not logged in' });

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json({ message: 'Session Expired' });

        const q = 'INSERT INTO posts (`desc`,`img`,`createdAt`,`userId`) VALUES (?,?,?,?)';
        const values = [
            req.body.desc,
            req.body.img,
            moment(Date().now).format('YYYY-MM-DD HH:mm:ss'),
            userInfo.id
        ];

        db.query(q, values, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Server Error' });
            } else {
                res.status(200).json({ message: 'Post has been created' });
            }
        })
    });
}
export const deletePost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: 'Not logged in' });

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json({ message: 'Session Expired' });

        const q = 'DELETE from posts WHERE `id` = ? AND `userId` = ?';
        const values = [req.params.postId, userInfo.id];
        console.log(values);

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json({ message: 'Server Error' });
            if (data.affectedRows === 0) return res.status(400).json({ message: 'You can delete only your post' });
            return res.status(200).json({ message: 'Post has been deleted' });
        })
    });
}

export const getPost = (req, res) => {
    const postId = req.params.postId;
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: 'Not logged in' });

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json({ message: 'Session Expired' });

        const q = 'SELECT p.*,u.id AS userId ,u.name AS userName ,u.profilePic AS userProfilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.id = ?';
        db.query(q, [postId], (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Server Error' });
            } else if (data.length > 0) {
                res.status(200).json(data[0]);
            } else {
                res.status(404).json({ message: 'Post not found' });
            }
        });
    });
}