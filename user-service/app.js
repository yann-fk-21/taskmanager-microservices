const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.get('/api/users', (req, res) => {
  res.json({ message: 'List of users' });
});

app.listen(process.env.PORT_USER_SERVICE, () => {
  console.log(`User service running on port ${process.env.PORT_USER_SERVICE}`);
});
