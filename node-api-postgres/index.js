import express from "express";
import bodyParser from "body-parser";
const app = express();
import cors from "cors";

import getTwitterJSON from "./twitterAPI.js";
const port = 3000;

import db from "./queries.js";

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

// app.put("/users/:id", db.updateUser);

//GET twitter data from twitter API
app.get("/tweets", db.getTweets);

//POST twitter data to our API
app.post("/tweets", db.postTweets);

//GET twitter data from our API
app.get("/twitterdata", db.getOurTweets);

// app.delete("/users/:id", db.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
