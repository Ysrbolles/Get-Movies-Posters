const SerpApi = require("google-search-results-nodejs");
const search = new SerpApi.GoogleSearch(
  "token_here"
);
const fs = require("fs");
const axios = require("axios");

const movies = [
  "The Matrix",
  "The Matrix Reloaded",
  "The Matrix Revolutions",
  "Harry Potter and the chamber of secrets movie",
];

movies.forEach((movie) => {
  const params = {
    q: movie,
    tbm: "isch",
    ijn: "0",
    tbs: "itp:photos,isz:l",
  };

  const callback = function (data) {
    // download image
    const image = data["images_results"][0];
    const url = image["original"];
    axios({
      url,
      responseType: "stream",
    }).then(
      (response) =>
        new Promise((resolve, reject) => {
          response.data

            .pipe(fs.createWriteStream(`Posters/${movie}.jpg`))
            .on("finish", () => resolve())
            .on("error", (e) => reject(e));
        })
    );
  };

  // Show result as JSON
  search.json(params, callback);
});

