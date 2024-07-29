import { MongoClient } from 'mongodb'; // Corrected the import
const URI = "mongodb+srv://siddupalle11:siddupalle@mathcluster.sqngrgd.mongodb.net/";
const options = {}; // Assuming you'll add options, otherwise, this can be omitted

if (!URI) throw new Error('Please add your Mongo URI to .env.local'); // Corrected the error syntax

let client = new MongoClient(URI, options); // Correct usage of MongoClient
let clientPromise;

if (process.env.NODE_ENV !== 'production') {
  // Check if the promise does not already exist
  
  if (!global._mongoClientPromise) {
    
    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
} else {
  
  clientPromise = client.connect();
}

export default clientPromise;