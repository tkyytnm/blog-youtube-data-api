const express = require("express");
const app = express();
const port = process.env.PORT;
const axios = require("axios");
const morgan = require("morgan");

const apiKey = process.env.API_KEY;
const query = "料理";
const requestUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query}&relevanceLanguage=ja&type=video&key=${apiKey}`;

app.use(morgan("dev"));

app.get("/api", (req, res) => {
  axios
    .get(requestUrl)
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
