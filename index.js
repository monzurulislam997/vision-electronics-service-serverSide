 const { MongoClient } = require("mongodb");
 const ObjectId = require("mongodb").ObjectId;
 const express = require("express");
 require("dotenv").config();
 const cors = require("cors");
 const app = express()
 //mildeware
 app.use(cors());
 app.use(express.json());
 const port = process.env.PORT || 5001
 //mongodb

 const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1u9t2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


 //mongodb client
 const client = new MongoClient(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
 });

async function run() {
  try {
    await client.connect();
    const database = client.db("visionElectronics");
    const services = database.collection("services");
    const allServices = database.collection("allServices";
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = services.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
   app.post('/services', async (req, res) => {
  const services = req.body;
  const result = await servicesCollection.insertOne(services)
  
  res.json(result)

})


    app.get("/services/:id", async (req, res) => {
      console.log("browser id is", req.params.id);
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await services.findOne(query);
      res.send(result);
    });



    app.post("/services", async (req, res) => {
      const bookingInfo = req.body;
      const query = { bookingInfo };
      const result = await allOrders.insertOne(query);
      res.json(result);
    });
app.get("/booking", async (req, res) => {
        const query = {};
        const cursor = services.find(query);
        const result = await cursor.toArray();
        res.send(result);
      });

    app.post("/booking",async(req,res)=>{
     const addingInfo =req.body
  
     const result = await services.insertOne({addingInfo})
     res.json(result)
    })

//POST reviews
app.post('/reviews', async (req, res) => {
  const review = req.body;
  const result = await reviewCollection.insertOne(review)
  res.json(result);
})

//GET reviews code
app.get('/reviews', async (req, res) => {
  const cursor = reviewCollection.find({});
  const reviews = await cursor.toArray();
  res.send(reviews);
  
})

// Users POST
app.post('/users', async (req, res) => {
  const user = req.body;
  const result = await usersCollection.insertOne(user)
  res.json(result)
  console.log("console " ,result)
})
//POST Order
app.post('/orders', async (req, res) => {
  const order = req.body;
  const result = await ordersCollection.insertOne(order);
  
  res.json(result)
});

// GET orders
app.get('/orders', async (req, res) => {
  const cursor = ordersCollection.find({});
  const orders = await cursor.toArray();
  console.log(orders)
  res.send(orders);
})

// DELETE orders
app.delete('/orders/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await ordersCollection.deleteOne(query);
  res.json(result);
 
})

app.get("/allOrder", async (req, res) => {
  const query = {};
  const cursor = allOrders.find(query);
  const result = await cursor.toArray();
  res.send(result);
});

app.delete("/allOrder/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await allOrders.deleteOne(query)
  res.json(result)
});


app.put('/users/admin', async (req, res) => {
  //console.log(req.body)
  const filter = { email: req.body.email }
  const updateDoc = { $set: { role: 'admin' } }
  const result = await usersCollection.updateOne(filter, updateDoc)
  res.json(result)
  console.log(result)
})

// admin Check
app.get('/users/:email', async (req, res) => {
  const email = req.params.email;
  //console.log(email)
  const query = { email: email }
  const user = await usersCollection.findOne(query);
  let isAdmin = false;
  if (user?.role === 'admin') {
      isAdmin = true;
  }
  res.json({ admin: isAdmin })
})
    
  } finally {
    //   await client.close();
    //close it 
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("this is response from server and welcome everybody !! :)");
});
app.get("/n", (req, res) => {
  res.send("updated here)");
});



app.listen(port, () => {
  console.log("listening to this port", port);
});



