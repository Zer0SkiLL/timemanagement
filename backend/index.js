import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import whitelistRoutes from './routes/whitelist.js';
import userRoutes from './routes/user.js';
import workdayRoutes from './routes/workday.js';
import commentRoutes from './routes/comment.js';
import categoryRoutes from './routes/category.js';
import taskRoutes from './routes/task.js';

// Configurations
process.env.TZ = 'Europe/Berlin';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envFielPath = process.env.NODE_ENV === 'production' ? '.env' : '.env.dev';
dotenv.config({ path: path.resolve(__dirname, envFielPath) });
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.use('/api/auth', authRoutes);
app.use('/api/whitelist', whitelistRoutes);
app.use('/api/user', userRoutes);
app.use('/api/workday', workdayRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/task', taskRoutes);

// Mongoose Setup
const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
