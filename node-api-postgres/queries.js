const Pool = require("pg").Pool; //Environment
const getTwitter = require("./twitterAPI.js");

const pool = new Pool({
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
const getTweets = (request, response) => {
  console.log("hits");
  getTwitter.getTwitterJSON();
  console.log(twitterData);
  response.status(200);
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

module.exports = {
  getUsers,
  getUser,
  getTweets,
  updateUser,
  deleteUser,
};
