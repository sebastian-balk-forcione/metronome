const { entries } = require("./users");

const { MongoClient } = require("mongodb");
require("dotenv").config("");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
console.log(entries);
const batchImport = async () => {
  console.log(MONGO_URI, "test");
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Metronome");

    const result = await db.collection("entries").insertMany(entries);
    console.log(result);
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
};

batchImport();
