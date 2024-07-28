const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/sellers', require('./routes/sellers'));
app.use('/api/buyers', require('./routes/buyers'));


app.use((err, req, res, next) => {
  console.error(err);
  const message = err.message;
  const status = err.statusCode || 500;
  const data = err.data;
  res.status(status).json({message: message, data: data});
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
