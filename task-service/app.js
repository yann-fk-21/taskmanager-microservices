const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.get('/api/tasks', (req, res) => {
  res.json({ message: 'List of tasks' });
});

const port = process.env.PORT_TASK_SERVICE || 3002;

app.listen(port, () => {
  console.log(`Task service running on port ${port}`);
});
