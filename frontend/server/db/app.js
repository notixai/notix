const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://db:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'notix';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('test');

  // the following code examples can be pasted here...
  const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
  console.log('Inserted documents =>', insertResult);
  
  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());