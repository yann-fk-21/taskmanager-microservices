const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db.config');
const authRoutes = require('./routes/auth.route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoutes);

const port = process.env.PORT_AUTH_SERVICE || 3001;

app.listen(port, async () => {
  await connectDB();
  console.log(`Auth service running on port ${port}`);
});
