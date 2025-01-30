import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from './database';

const SECRET_KEY = 'your_jwt_secret';

// Sign up function
export async function signup(req, res) {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword]
  );

  const token = jwt.sign({ id: result.insertId }, SECRET_KEY, { expiresIn: '1h' });
  res.status(201).json({ token });
}

// Login function
export async function login(req, res) {
  const { email, password } = req.body;

  const users = await query('SELECT * FROM users WHERE email = ?', [email]);
  if (users.length === 0) return res.status(400).json({ message: 'User not found' });

  const user = users[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
  res.status(200).json({ token });
}
