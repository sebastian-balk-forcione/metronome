const users = require("./users");

const { MongoClient } = require("mongodb");
require("dotenv").config("");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  console.log(users);
  //   const client = new MongoClient(MONGO_URI, options);
  //   try {
  //     await client.connect();
  //     const db = client.db("Metronome");

  //     const result = await db.collection("users").insertMany(users);
  //     console.log(result, users);
  //   } catch (err) {
  //     console.log(err.stack, users);
  //   }
  //   client.close();
};

batchImport();
