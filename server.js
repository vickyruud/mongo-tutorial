const express = require("express");
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

//body parser

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

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
          res.render('index.ejs', {quotes: result})
        })
      .catch(error => console.error(error))
    });
    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.log(error));
    });

    app.put('/quotes', (req, res) => {
      console.log(req.body)
    })
    


  })
  .catch(error => (console.log(console.log(error))));

