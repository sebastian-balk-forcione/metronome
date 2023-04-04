"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config("");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const { v4: uuidv4 } = require("uuid");

const client = new MongoClient(MONGO_URI, options);

const getEntries = async (req, res) => {
  const _id = req.params._id;

  try {
    await client.connect();
    const db = client.db("Metronome");
    const result = await db.collection("entries").findOne({ _id });

    result
      ? res.status(200).json({ status: 200, data: result.entries })
      : res.status(404).json({ status: 404, message: "Information not found" });
  } catch {
    res
      .status(500)
      .json({ status: 500, message: "An unexpected error occured" });
  }
  client.close();
};

// checks if user exists in mongo, if not add.
const checkUser = async (req, res) => {
  const body = req.body;
  const email = body.email;
  const newCode = uuidv4();
  try {
    await client.connect();
    const db = client.db("Metronome");
    const result = await db.collection("users").findOne({ email });
    console.log(result);
    if (!result) {
      const newUser = { _id: newCode, ...body };
      addUser = await db.collection("users").insertOne(newUser);
      if (addUser) {
        res.status(200).json({
          status: 200,
          _id: newCode,
          message: "User added succesfully",
        });
      }
    } else {
      res.status(200).json({
        status: 200,
        _id: result._id,
        message: `${body.name} has succesfully logged in`,
      });
    }
  } catch {
    res
      .status(500)
      .json({ status: 500, message: "An unexpected error occured" });
  }
  client.close();
};

const newEntry = async (req, res) => {
  const body = req.body;
  !body &&
    res.status(400).json({
      status: 400,
      message:
        "Please ensure all of the proper information is being passed to the backend",
    });
  const newCode = uuidv4();
  const newEntry = {
    _id: newCode,
    date: body.date,
    subject: body.subject,
    entry: body.entry,
  };
  try {
    await client.connect();
    const db = client.db("Metronome");
    const query = { _id: body.id };
    const update = { $push: { entries: newEntry } };
    const result = await db.collection("entries").updateOne(query, update);
    if (result.matchedCount === 1 && result.modifiedCount === 1) {
      res.status(200).json({ status: 200, success: true, data: newCode });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "An unexpected error occured" });
    }
  } catch {
    res
      .status(500)
      .json({ status: 500, message: "An unexpected error occured" });
  }
  client.close();
};

module.exports = { checkUser, getEntries, newEntry };
