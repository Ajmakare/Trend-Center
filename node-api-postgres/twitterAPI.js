async function getTwitterJSON() {
  fetch("https://api.twitter.com/1.1/trends/place.json?id=1", {
    method: "GET",
    headers: {},
  })
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

module.exports = {
  getTwitterJSON,
};
