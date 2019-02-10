const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const users = require('./routes/users.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(`/`, users)

app.get(`/`, (req, res) => {
  res.send("homepage!")
})

app.use((error, req, res, next) => { //ERROR HANDLER
  res.send(error+"ERROR")
})

app.get(`*`, (req, res) => {
  res.send("ERROR");
})
app.listen(3100, () => {
  console.log("userlist: you are listening to 3100");
})
