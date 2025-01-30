import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../database';

const SECRET_KEY = 'your_jwt_secret';

export default async function login(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const users = await query('SELECT * FROM users WHERE email = ?', [email]);

      if (users.length === 0) {
        return res.status(400).json({ message: 'User not found' });
      }

      const user = users[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error during login' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
