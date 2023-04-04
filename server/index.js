"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const port = 8888;

const { checkUser, getEntries, newEntry, deleteEntry } = require("./handlers");

express()
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  .get("/test", (req, res) => {
    res.status(200).json({ status: 200, success: true });
  })

  .get("/entries/:_id", getEntries)

  .post("/newEntry", newEntry)

  .post("/login", checkUser)

  .delete("/delete-entry/:entryid/:userid", deleteEntry)

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(port, () => console.log(`Listening on port ${port}`));
