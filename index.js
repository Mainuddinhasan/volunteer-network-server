// cd \Web development\React\volunteer-network-server

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.abcuj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// console.log(process.env.DB_USER)
const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
client.connect(err => {
console.log(err);
  const freewillWorkCollection = client.db("volunteerWork").collection("willingWorks");
//  console.log('db connected')
app.post('/addProduct', (req, res) => {
    const product = req.body;
    console.log(product)
    freewillWorkCollection.insertOne(product)
      .then(result => {
          // console.log(result)
          res.send(result.insertedCount)  
        // res.send(result.insertedCount>0) error

      })
  })

  app.get('/products', (req, res) => {
    freewillWorkCollection.find({})
    .toArray( (err, documents) => {
      res.send(documents);
    })
  })

  app.get('/product/:_id', (req, res) => {
    freewillWorkCollection.find({_id: ObjectId(req.params._id)})
    .toArray( (err, documents) => {
      res.send(documents[0]);
    })
  })
 
 
});
// app.post('/addProducts', (req, res) => {
//   const product = req.body;
//   console.log(product)
// //   freewillWorkCollection.insertMany(product)
// //     .then(result => {
// //         console.log(result)
// //       res.send(result.insertedCount > 0)

// //     })
// // })

// // perform actions on the collection object
// // client.close();
// });

app.listen(port)




