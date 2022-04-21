//const express = require("express");
import express from "express"
//const bodyParser = require("body-parser")
import bodyParser from "body-parser"
const app = express()
//const cors = require("cors")
import cors from "cors"

import getTwitterJSON from "./twitterAPI.js"
const port = 3000

//const db = require("./queries")
import db from "./queries.js"

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" })
})

app.get("/users", db.getUsers)
// app.get("/users/:id", db.getUser);

// app.put("/users/:id", db.updateUser);
app.get("/tweets", db.getTweets)

// app.post("/twitterdata", db.createTrends);

// app.delete("/users/:id", db.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
