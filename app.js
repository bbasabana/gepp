import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import methodOverride from 'method-override';
import joiErrors from './middlewares/joiErrors';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(joiErrors());

app.get('/', (req, res) => {
  return res.json({ status: 200, message: 'Welcome to our API' });
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, res, next) => {
  res.status(err.status || 500).json({
    errors: {
      message: err.message,
      error: err
    }
  });
});

export default app;