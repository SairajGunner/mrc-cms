var express = require("express");
const cors = require("cors");

var app = express();
app.use(cors());

const customersEndpoint = require("./src/endpoints/customers.js");
const engagementsEndpoint = require("./src/endpoints/engagements.js");
const notesEndpoint = require("./src/endpoints/notes.js");
const searchEndpoint = require("./src/endpoints/search.js");
const backupEndpoint = require("./src/endpoints/backup.js");

app.use("/customers", customersEndpoint);
app.use("/engagements", engagementsEndpoint);
app.use("/notes", notesEndpoint);
app.use("/search", searchEndpoint);
app.use("/backup", backupEndpoint);

var server = app.listen(process.env.PORT || 3010, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("MRC CMS API listening at http://%s:%s", host, port);
});
