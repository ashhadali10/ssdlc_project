import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// MongoDB Connection
const uri = "mongodb+srv://demo-book:8uNpi6ljDydjzzWO@atlascluster.1j83rju.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    console.log("Connected to MongoDB!");

    // Access or create a collection
    const bookCollection = client.db("BookInventory").collection("books");

    // Define routes
    app.post("/upload-book", async (req, res) => {
      const data = req.body; // Assuming your request body contains JSON data
      try {
        const result = await bookCollection.insertOne(data);
        res.status(201).json({ message: "Book uploaded successfully", data: result });
      } catch (err) {
        console.error("Error uploading book:", err);
        res.status(500).json({ error: "Failed to upload book" });
      }
    });

//get all books from the database
app.get("/all-books",async(req, res) => { 
  const books =  await bookCollection.find();
  const result =  await books.toArray();
  res.send(result)
})

app.patch("/books/:id", async(req, res) => {
  const id = req.params.id;
  //console.log(id);
  const updateBookData = req.body;
  const filter ={_id: new ObjectId(id)}
  const options = { upsert: true };
  const updateDoc = {
    $set: {  
      ...updateBookData
    }
  }

  //update
  const result = await bookCollections.updateOne(filter, updateDoc, options);
  res.send(result);

})

//delete book data
app.delete("/book/:id", async(req, res) => { 
  const id = req.params.id;
  const filter = { _id: new ObjectId(id)};
  const result = await bookCollections.deleteOne(filter);
  res.send(result);
})

//find by category
app.get("/a;;-books", async(req,res)=> {
  let query = {};
  if(req.query?.category){
    query = { category: req.query.category}
  }
  const result = await bookCollection.find(query).toArray();
  res.send(result);
})

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  } finally {
    // Close the MongoDB connection after operations
    // await client.close();
  }
}

// Call the run function to start the application
run().catch(console.dir);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
