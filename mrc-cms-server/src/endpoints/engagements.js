var express = require("express");
var fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../database/engagements.json");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/get", function (req, res) {
  console.log(filePath);

  fs.readFile(filePath, "utf8", function (err, data) {
    console.log(data);
    res.end(data);
  });
});

router.post("/post", function (req, res) {
  let engagementsList = [];
  const newEngagementData = {
    id: req.body.id,
    customerId: req.body.customerId,
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    hoursOfWork: req.body.hoursOfWork,
    areaOfWork: req.body.areaOfWork,
    remarks: req.body.remarks
  };

  fs.readFile(filePath, "utf-8", (err, data) => {
    engagementsList = JSON.parse(data);
    engagementsList.push(newEngagementData);

    fs.writeFileSync(filePath, JSON.stringify(engagementsList), "utf-8");

    res.end("File Updated!");
  });
});

module.exports = router;
