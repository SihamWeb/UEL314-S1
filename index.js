
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const apiRouter = require('./routes/usersRoutes').router;

app.use(express.json());
app.use('/api/', apiRouter);

app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send('Hello world !');
});

app.listen(port, () => {
  console.log('Server listening on port : ' + port)
});

module.exports = app;
