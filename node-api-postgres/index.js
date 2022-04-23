import express from "express";
import bodyParser from "body-parser";
const app = express();
import cors from "cors";
import fetch from "node-fetch";

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

//GET twitter data from twitter API
app.get("/tweets", db.getTweets);

//POST twitter data to our API
app.post("/tweets", db.postTweets);

//GET twitter data from our API
app.get("/twitterdata", db.getOurTweets);

//DELETE data in twitterdata table to keep trends up-to-date
//Delete all because there is no need to delete individual entries
//So, our delete operation will clear the table
app.delete("/twitterdata", db.deleteTwitterData);

//UPDATE trends to be NULL
//This is unnecassary to our implementation, but is required so we
//are just updating the tuples to be null to full-fill requirement
app.put("/twitterdata", db.updateTwitterDataNULL);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
