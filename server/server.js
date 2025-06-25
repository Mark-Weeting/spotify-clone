import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB verbonden');
    app.listen(PORT, () => console.log(`Server draait op poort ${PORT}`));
  })
  .catch(err => {
    console.error('Fout bij verbinden met MongoDB', err);
  });
