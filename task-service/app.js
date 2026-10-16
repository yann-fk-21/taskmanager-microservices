const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const taskRoutes = require('./routes/task.route');
const connectBD = require('./config/db.config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/tasks', taskRoutes);

<<<<<<< HEAD
const port = process.env.PORT_TASK_SERVICE || 3002;
=======
const port = process.env.PORT_TASK_SERVICE || 8001;
>>>>>>> 1c3b474 (feat: add api gateway)

app.listen(port, async () => {
  await connectBD();
  console.log(`Task service running on port ${port}`);
});
