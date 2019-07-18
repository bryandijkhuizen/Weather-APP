const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

const apiKey = "6a2e6a06607d519be9f88817521d4c09";

app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index", {
    weather: null,
    error: null
  });
});

app.post("/", function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  request(url, function (err, response, body) {
    if (err) {
      res.render("index", {
        weather: null,
        error: "Error, please try again"
      });
    } else {
      let weather = JSON.parse(body);
      if (weather.main == undefined) {
        res.render("index", {
          weather: null,
          error: "Error, please try again"
        });
      } else {
        let weatherText = `It's ${Math.round(
          (weather.main.temp - 32) / 1.8
        )} degrees in ${weather.name}!`;
        res.render("index", {
          weather: weatherText,
          error: null
        });
      }
    }
  });
});

app.listen(3001, function () {
  console.log("Example app listening on port 3001!");
});