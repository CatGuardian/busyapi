const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// connection url
const url = process.env.MONGODBURL || 'mongodb://localhost:27017';

console.log('Mongo URL = ', url); // debug only remove

// Database Name
const dbName = 'busyapi';

module.exports = function(app){

  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    app.db = db;

    createUsageCollection(db, function() {
    });
  });
}

function createUsageCollection(db, callback) {
  db.createCollection("Usage",
    function(err, results) {
      console.log("Collection created.");
      callback();
    }
  );
};