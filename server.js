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
    const db = client.db('pet-quotes');
    const quotesCollection = db.collection('quotes');

    app.use(bodyParser.urlencoded({ extended: true }));
    
    //get request from db and then render it
    app.get('/', (req, res) => {
      db.collection('quotes').find().toArray()
        .then(result => {
          console.log(result);
        })
      .catch(error => console.error(error))

      res.sendFile(__dirname + '/index.html')
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

