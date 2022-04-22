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
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
          for (let k = 0; k < 15; k++) {
            infoUI.innerHTML +=
              JSON.stringify(data.rows[i].trends[j].trends[k].url) + "<br>";
          }
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
