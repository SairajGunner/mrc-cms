var express = require("express");
var fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/get", function (req, res) {
  const filePath = path.join(__dirname, "../database/notes.json");
  console.log(filePath);

  fs.readFile(filePath, "utf8", function (err, data) {
    console.log(data);
    res.end(data);
  });
});

module.exports = router;