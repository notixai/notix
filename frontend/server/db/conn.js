const { MongoClient, Server } = require("mongodb");

/*const Db = process.env.ATLAS_URI;

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
*/
const url = 'mongodb://db:27017';
const client = new MongoClient(url);
 
var _db;

// Database Name
const dbName = 'notix';
 
module.exports = {
  connectToServer: function (callback) {
    console.log("test1");
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db(dbName);
        console.log("Successfully connected to MongoDB."); 
      }
      console.log("test2");
      return callback(err);
    });
  },
 
  getDb: function () {
    return _db;
  },
};
