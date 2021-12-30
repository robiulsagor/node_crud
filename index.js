const express = require('express')
const app = express();
var cors = require('cors')
app.use(cors())
const { MongoClient } = require('mongodb');
ObjectId = require('mongodb').ObjectId
const bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const uri = "mongodb+srv://robiul12:ltTlfI5940vZyxNr@cluster0.azqou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("organicDB").collection("products");

  // GET ALL PRODUCTS
  app.get('/products', (req, res) => {
    collection.find({})
      .toArray((err, docs) => {
        res.send(docs)
        console.log(docs);
      })
  })

  // ADD PRODUCTS
  app.post('/add', (req, res) => {
    collection.insertOne(req.body)
      .then((docs) => {
        res.send(req.body)
      })
  })

  // DELETE SINGLE PRODUCT
  app.delete('/delete/:id', (req, res) => {
    collection.deleteOne({ _id: ObjectId(req.params.id) })
      .then(result => {
        console.log(result);
        res.send(result);
      })
  })

  // LOAD SINGLE PRODUCT
  app.get('/product/:id', (req, res) => {
    collection.find({ _id: ObjectId(req.params.id) })
      .toArray((err, docs) => {
        console.log(docs);
        res.send(docs)
      })
  })

  // UPDATE SINGLE PRODUCT
  app.patch('/update/:id', (req, res) => {
    console.log(req.body.name);
    collection.updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $set: { name: req.body.name, price: req.body.price, quantity: req.body.quantity }
      }
    )
      .then(result => {
        res.send(result);
      })
  })

  app.post('/addUser', (req, res) => {
    collection.insertOne(req.body)
    .then(result => {
      console.log(result);
    })
  })

});



app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
})