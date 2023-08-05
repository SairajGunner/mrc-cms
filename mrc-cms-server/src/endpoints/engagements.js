var express = require("express");
var fs = require("fs");
const path = require("path");
var uuid = require("uuid");

const router = express.Router();
const filePath = path.join(__dirname, "../database/engagements.json");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Get all engagements
router.get("/get", (req, res) => {
  console.log(filePath);

  fs.readFile(filePath, "utf8", (err, data) => {
    res.setHeader("Content-Type", "application/json");
    res.end(data);
  });
});

// Get engagement by ID
router.get("/get/:id", (req, res) => {
  let engagementsList = [];

  fs.readFile(filePath, "utf-8", (err, data) => {
    engagementsList = JSON.parse(data);
    let requiredEngagement = JSON.stringify(
      engagementsList.find((engagement) => engagement.id == req.params.id)
    );
    res.setHeader("Content-Type", "application/json");
    res.end(requiredEngagement);
  });
});

//Get engagements by customerId
router.get("/get/customer/:customerId", (req, res) => {
  let engagementsList = [];

  fs.readFile(filePath, "utf-8", (err, data) => {
    engagementsList = JSON.parse(data);
    let requiredEngagements = JSON.stringify(
      engagementsList.filter(
        (engagement) => engagement.customerId == req.params.customerId
      )
    );
    res.setHeader("Content-Type", "application/json");
    res.end(requiredEngagements);
  });
});

// Add a new engagement
router.post("/post", (req, res) => {
  let engagementsList = [];
  const newEngagementData = {
    id: uuid.v4(),
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

    res.setHeader("Content-Type", "application/json");
    res.end("Engagement added!");
  });
});

// Update engagement by ID
router.put("/update/:id", (req, res) => {
  let engagementsList = [];

  const engagementData = {
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
    engagementsList[
      engagementsList.findIndex((engagement) => engagement.id == req.params.id)
    ] = engagementData;

    fs.writeFileSync(filePath, JSON.stringify(engagementsList), "utf-8");

    res.setHeader("Content-Type", "application/json");
    res.end("Engagement updated!");
  });
});

// Delete engagement by ID
router.delete("/delete/:id", (req, res) => {
  let engagementsList = [];

  fs.readFile(filePath, "utf-8", (err, data) => {
    engagementsList = JSON.parse(data);
    engagementsList.splice([
      engagementsList.findIndex((engagement) => engagement.id == req.params.id)
    ]);

    fs.writeFileSync(filePath, JSON.stringify(engagementsList), "utf-8");

    res.setHeader("Content-Type", "application/json");
    res.end("Engagement deleted!");
  });
});

module.exports = router;
