require('dotenv').config();
const express = require('express');
const mongoose = require('./db/mongo');
const cors = require('cors');

const voteRoutes = require('./routes/voteRoutes');


const app = express();
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_ORIGIN 
    : 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-email'],
};

app.use(cors(corsOptions));


app.use(cors(corsOptions));



app.use(express.json());
app.use('/api/votes', voteRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
