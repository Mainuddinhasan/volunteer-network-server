// cd \Web development\React\volunteer-network-server

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.abcuj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// console.log(process.env.DB_USER)
const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 4000

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
client.connect(err => {
  const freewillWorkCollection = client.db("volunteerWork").collection("willingWorks");
//  console.log('db connected')
app.post('/addProduct', (req, res) => {
    const product = req.body;
    freewillWorkCollection.insertOne(product)
      .then(result => {
          // console.log(result)
        res.send(result.insertedCount)

      })
  })
 
  // perform actions on the collection object
  // client.close();
});


app.listen(port)




