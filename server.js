const express = require("express");
const bodyParser= require('body-parser')
const app = express();

//body parser
app.use(bodyParser.urlencoded({ extended: true }))


app.listen(5000, () => {
  console.log("Listening on port 5000");
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  console.log(__dirname);
})

app.post('/quotes', (req, res) => {
  console.log(req.body)
})