var express = require("express");
var fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../database/customers.json");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/get", function (req, res) {
  console.log(filePath);

  fs.readFile(filePath, "utf-8", function (err, data) {
    console.log(data);
    res.end(data);
  });
});

router.post("/post", function (req, res) {
  let customerList = [];
  const newCustomerData = {
    id: req.body.id,
    name: req.body.name,
    organization: req.body.organization,
    dateOfAssociation: req.body.dateOfAssociation,
    areaOfInterest: req.body.areaOfInterest,
    isProspect: req.body.isProspect,
  };

  fs.readFile(filePath, "utf-8", (err, data) => {
    customerList = JSON.parse(data);
    customerList.push(newCustomerData);

    fs.writeFileSync(filePath, JSON.stringify(customerList), "utf-8");

    res.end("File Updated!");
  });
});

module.exports = router;
