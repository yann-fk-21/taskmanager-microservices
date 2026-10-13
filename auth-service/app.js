const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.get('/api/auth', (req, res) => {
  res.json({ message: 'Auth service ready' });
});

const port = process.env.PORT_AUTH_SERVICE || 3001;

app.listen(port, () => {
  console.log(`Auth service running on port ${port}`);
});
