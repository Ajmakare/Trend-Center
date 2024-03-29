//On window load, populate the middle of page with twitter data.
window.onload = (event) => {
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
  //GET from our API
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
      //Populate p tag with proper data from JSON
      //Most recent JSON posted to DB, for most up-to-date trending hashtags
      let temp = 0;
      var ul = document.getElementById("data");
      for (let j = 0; j < data.rows.length; j++) {
        temp++;
        var string = "-----------------------------------------";
        $("ul").prepend($("<li>").html(string));
        for (let i = 0; i < data.rows[0].trends[0][0].trends.length; i++) {
          if (
            JSON.stringify(data.rows[j].trends[0][0].trends[i].tweet_volume) ==
            "null"
          ) {
            var string = JSON.stringify(
              data.rows[j].trends[0][0].trends[i].name
            );
            $("ul").prepend($("<li>").html(string));
          } else {
            var string =
              JSON.stringify(data.rows[j].trends[0][0].trends[i].name) +
              " with " +
              JSON.stringify(data.rows[j].trends[0][0].trends[i].tweet_volume) +
              " tweets!";
            $("ul").prepend($("<li>").html(string));
          }
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
