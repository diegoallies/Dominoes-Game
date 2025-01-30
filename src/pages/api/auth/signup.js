import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../database';

const SECRET_KEY = 'your_jwt_secret';

export default async function signup(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );

      const token = jwt.sign({ id: result.insertId }, SECRET_KEY, { expiresIn: '1h' });
      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
