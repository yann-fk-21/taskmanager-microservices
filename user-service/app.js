const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const userRoutes = require('./routes/user.route');
const connectDB = require('./config/db.config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/users', userRoutes);

app.listen(process.env.PORT_USER_SERVICE, async () => {
  await connectDB();
  console.log(`User service running on port ${process.env.PORT_USER_SERVICE}`);
});
