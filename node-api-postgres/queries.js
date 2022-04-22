// const Pool = require("pg").Pool //Environment
import Pool from "pg";
// const getTwitter = require("./twitterAPI.js")
import getTwitterJSON from "./twitterAPI.js";

const pgPool = Pool.Pool;

const pool = new pgPool({
  user: "me",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
});

const getUsers = (request, response) => {
  console.log("WORKS");
  pool.query("SELECT * FROM twitterdata", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUser = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT * FROM user_info WHERE id= $1 ", //$1 is our selector
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getTweets = async (request, response) => {
  console.log("hits");
  const result = await getTwitterJSON();
  console.log(result);

  return response.status(200).json(result);
};

const postTweets = (request, response) => {
  const { id, age, name } = request.body;
  console.log(id, age, name);

  pool.query(
    "INSERT INTO user_info (id, age, name) VALUES ($1, $2, $3)",
    [id, age, name],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added`);
    }
  );
};

const updateUser = (request, response) => {
  console.log("hits");
  const id = parseInt(request.params.id);
  const { name, age } = request.body;

  pool.query(
    "UPDATE user_info SET name = $1, age = $2 WHERE id = $3",
    [name, age, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);
  console.log(id);

  pool.query("DELETE FROM user_info WHERE id= $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User Deleted`);
  });
};

export default {
  getUsers,
  getUser,
  getTweets,
  postTweets,
  updateUser,
  deleteUser,
};
