import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check of user/email al bestaat
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) return res.status(400).json({ message: 'Gebruikersnaam of email bestaat al' });

    // Hash wachtwoord
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Nieuwe user maken
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User geregistreerd!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Zoek user op email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Gebruiker niet gevonden' });

    // Check wachtwoord
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Ongeldig wachtwoord' });

    // Maak JWT token aan
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Stuur response zonder wachtwoord
    res.json({
      message: 'Inloggen gelukt',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
