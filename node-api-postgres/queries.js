import Pool from "pg";
import getTwitterJSON from "./twitterAPI.js";

const pgPool = Pool.Pool;

const pool = new pgPool({
  user: "me",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
});

//GET Twitter JSON from Twitter API
const getTweets = async (request, response) => {
  console.log("hits");
  const result = await getTwitterJSON();
  console.log(result);

  return response.status(200).json(result);
};

//POST Twitter JSON to our API
const postTweets = async (request, response) => {
  let tweetData = request.body;
  console.log(tweetData);

  pool.query(
    "INSERT INTO twitterdata (trends) VALUES ($1)",
    [tweetData],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Tweets posted to API`);
    }
  );
};

//GET Twitter data from our API
const getOurTweets = async (request, response) => {
  pool.query("SELECT * FROM twitterdata", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results);
  });
};

//UPDATE tuple
const updateTwitterDataNULL = (request, response) => {
  console.log("hits");
  const nullValue = null;

  pool.query(
    "UPDATE twitterdata SET trends = $1",
    [nullValue],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Table modified to be null`);
    }
  );
};

//Delete twitter data to keep the trends up-to-date
const deleteTwitterData = (request, response) => {
  pool.query("DELETE FROM twitterdata", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Twitter data Deleted`);
  });
};

export default {
  getTweets,
  postTweets,
  getOurTweets,
  updateTwitterDataNULL,
  deleteTwitterData,
};
