"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const port = 8888;

const {
  checkUser,
  getEntries,
  newEntry,
  deleteEntry,
  addSounds,
  getSounds,
} = require("./handlers");

express()
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  .get("/get-sounds/:id", getSounds)

  .get("/entries/:id", getEntries)

  .post("/newEntry", newEntry)

  .post("/add-sounds", addSounds)

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
