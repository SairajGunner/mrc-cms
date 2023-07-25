var express = require("express");
var fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../database/notes.json");

router.get("/get", function (req, res) {
  console.log(filePath);

  fs.readFile(filePath, "utf8", function (err, data) {
    console.log(data);
    res.end(data);
  });
});

module.exports = router;