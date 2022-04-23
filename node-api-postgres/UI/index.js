// Get tweet data
const getButton = document.getElementById("get-data-button");
getButton.addEventListener("click", () => {
  const result = fetch("http://localhost:3000/twitterdata", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  result
    .then((res) => {
      console.log("Request complete! response:", res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const infoUI = document.getElementById("data");
      infoUI.innerHTML = "";
      //Populate p tag with proper data from JSON
      infoUI.innerHTML += JSON.stringify(data.rows[0]) + "<br>";
    })
    .catch((error) => {
      console.log(error);
    });
});

// Post
const postButton = document.getElementById("post-button");

postButton.addEventListener("click", () => {
  //GET from twitter API
  const result1 = fetch("http://localhost:3000/tweets", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  result1
    .then((res) => {
      console.log("Request complete! response:", res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      //POST data to our API
      var raw = JSON.stringify([data]);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:3000/tweets", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    })
    .catch((error) => {
      console.log(error);
    });
});

// PUT
const putBotton = document.getElementById("put-button");

putBotton.addEventListener("click", () => {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  fetch("http://localhost:3000/twitterdata", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
});

// DELETE
const deleteBotton = document.getElementById("delete-button");

deleteBotton.addEventListener("click", () => {
  var requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };

  fetch("http://localhost:3000/twitterdata", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
});
