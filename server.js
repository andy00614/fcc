// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

const isValidDate = (date) => date instanceof Date && !isNaN(date.getTime())

function setTime(req, res) {
  let { time } = req.params;
  if (!time) {
    time = new Date().getTime();
  }
  let unix, utc;
  try {
    if (Number(time)) {
      time = Number(time);
      utc = new Date(time);
      if (!isValidDate(utc)) {
        throw "Invalid Date";
      }
      unix = utc.getTime();
    } else {
      const timeSplit = time.split("-");
      timeSplit[1] -= 1;
      timeSplit[2] = Number(timeSplit[2]) + 1;
      utc = new Date(...timeSplit);
      if (!isValidDate(utc)) {
        throw "Invalid Date";
      }
      unix = utc.getTime();
    }

    res.json({
      unix,
      utc,
    });
  } catch {
    res.json({ error: "Invalid Date" });
  }
}

app.get("/api/timestamp/:time", setTime);
app.get("/api/timestamp", setTime);

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
console.log("port", process.env.PORT);
var listener = app.listen(process.env.PORT || 7012, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
