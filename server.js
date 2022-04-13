const express = require("express");
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

//body parser


app.listen(5000, () => {
  console.log("Listening on port 5000");
})

//connect to mongo db
const connectionString = 'mongodb+srv://vickyruud:Ok78JCHRcgBknvxZ@firstcluster.0jwz1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
MongoClient.connect(connectionString)
  .then(client => {
    console.log('Connected to MongoDB');
    const db = client.db('star-wars-quotes');
    const quotesCollection = db.collection('quotes');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html')
      console.log(__dirname);
      
    });
    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.log(error));
    })
    


  })
  .catch(error => (console.log(console.log(error))));

