//On window load, populate the middle of page with twitter data.
window.onload = (event) => {
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

      //The Twitter JSON is a triple nested array... So O(n^3) it is!
      for (let i = 0; i < data.rows.length; i++) {
        for (let j = 0; j < data.rows[i].trends.length; j++) {
          for (let k = 0; k < data.rows[i].trends[j].trends.length; k++) {
            if (
              JSON.stringify(data.rows[i].trends[j].trends[k].tweet_volume) ==
              "null"
            ) {
              infoUI.innerHTML +=
                JSON.stringify(data.rows[i].trends[j].trends[k].name) + "<br>";
            } else {
              infoUI.innerHTML +=
                JSON.stringify(data.rows[i].trends[j].trends[k].name) +
                " with " +
                JSON.stringify(data.rows[i].trends[j].trends[k].tweet_volume) +
                " tweets!<br>";
            }
          }
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
