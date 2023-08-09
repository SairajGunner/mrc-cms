var express = require("express");
var fs = require("fs");
const path = require("path");

const router = express.Router();
const customersFilePath = path.join(__dirname, "../database/customers.json");
const engagementsFilePath = path.join(
  __dirname,
  "../database/engagements.json"
);
const notesFilePath = path.join(__dirname, "../database/notes.json");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Search Everything
router.get("/:query", (req, res) => {
  let customersSearchResults = [];
  let engagementsSearchResults = [];
  let notesSearchResults = [];

  fs.readFile(customersFilePath, "utf-8", (err, data) => {
    const customerList = JSON.parse(data);
    customerList.forEach((customer) => {
      for (let key in customer) {
        if (customer.hasOwnProperty(key)) {
          if (customer[key].toString().indexOf(req.params.query) > -1) {
            customersSearchResults.push(customer);
            break;
          } else {
            continue;
          }
        }
      }
    });

    fs.readFile(engagementsFilePath, "utf-8", (err, data) => {
      const engagementsList = JSON.parse(data);
      engagementsList.forEach((engagement) => {
        for (let key in engagement) {
          if (engagement.hasOwnProperty(key)) {
            if (engagement[key].toString().indexOf(req.params.query) > -1) {
              engagementsSearchResults.push(engagement);
              break;
            } else {
              continue;
            }
          }
        }
      });
      fs.readFile(notesFilePath, "utf-8", (err, data) => {
        const notesList = JSON.parse(data);
        notesList.forEach((note) => {
          for (let key in note) {
            if (note.hasOwnProperty(key)) {
              if (note[key].toString().indexOf(req.params.query) > -1) {
                notesSearchResults.push(note);
                break;
              } else {
                continue;
              }
            }
          }
        });

        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            customers: customersSearchResults,
            engagements: engagementsSearchResults,
            notes: notesSearchResults
          })
        );
      });
    });
  });
});

module.exports = router;