async function getTwitterJSON() {
  console.log("Getting Twitter JSON");
  const result = fetch("https://api.twitter.com/1.1/trends/place.json?id=1", {
    type: "GET",
    contentType: "application/json",
    headers: {
      Authorization: "",
    },
  });
  result
  .then((response) => {
      console.log(response);
      return response.json();
  })
}

// window.onload = () => {
//   $.ajax({
//     url: "https://api.twitter.com/1.1/trends/place.json?id=1",
//     type: "GET",
//     contentType: "application/json",
//     headers: {
//       Authorization: "",
//     },
//     success: function (result) {
//       //store to API, not UI
//     },
//   });
// };
