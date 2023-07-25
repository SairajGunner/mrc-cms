var express = require("express");
var fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../database/customers.json");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Get all customers
router.get("/get", (req, res) => {
  console.log(filePath);

  fs.readFile(filePath, "utf-8", (err, data) => {
    console.log(data);
    res.end(data);
  });
});

//Get customer by ID
router.get("/get/:id", (req, res) => {
  let customerList = [];

  fs.readFile(filePath, "utf-8", (err, data) => {
    customerList = JSON.parse(data);
    let requiredCustomer = JSON.stringify(
      customerList.find((customer) => customer.id == req.params.id)
    );
    res.end(requiredCustomer);
  });
});

// Add a new customer
router.post("/post", (req, res) => {
  let customerList = [];

  const newCustomerData = {
    id: req.body.id,
    name: req.body.name,
    organization: req.body.organization,
    dateOfAssociation: req.body.dateOfAssociation,
    areaOfInterest: req.body.areaOfInterest,
    isProspect: req.body.isProspect
  };

  fs.readFile(filePath, "utf-8", (err, data) => {
    customerList = JSON.parse(data);
    customerList.push(newCustomerData);

    fs.writeFileSync(filePath, JSON.stringify(customerList), "utf-8");

    res.end("Customer added!");
  });
});

// Update customer by ID
router.put("/update/:id", (req, res) => {
  let customerList = [];

  const customerData = {
    id: req.body.id,
    name: req.body.name,
    organization: req.body.organization,
    dateOfAssociation: req.body.dateOfAssociation,
    areaOfInterest: req.body.areaOfInterest,
    isProspect: req.body.isProspect
  };

  fs.readFile(filePath, "utf-8", (err, data) => {
    customerList = JSON.parse(data);
    customerList[
      customerList.findIndex((customer) => customer.id == req.params.id)
    ] = customerData;

    fs.writeFileSync(filePath, JSON.stringify(customerList), "utf-8");

    res.end("Customer updated!");
  });
});

// Delete customer by ID
router.delete("/delete/:id", (req, res) => {
  let customerList = [];

  console.log("Inside Request");

  fs.readFile(filePath, "utf-8", (err, data) => {
    customerList = JSON.parse(data);
    customerList.splice([
      customerList.findIndex((customer) => customer.id == req.params.id)
    ]);

    fs.writeFileSync(filePath, JSON.stringify(customerList), "utf-8");

    res.end("Customer deleted!");
  });
});

module.exports = router;
