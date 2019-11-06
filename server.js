var http = require("http");
const express = require("express");
const app = express();
const server = http.Server(app);
// const fs = require("fs");

// var server = http.createServer(function(req, res) {
//   fs.readFile("index.html", (err, data) => {
//     if (err) {
//       res.statusCode = 404;
//       res.setHeader("Content-Type", "text/plain");
//       res.end("File not found");
//     }
//     res.setHeader("Content-Type", "text/html");
//     res.statusCode = 200;
//     res.end(data);
//   });

//   // res.statusCode = 200;
//   // res.setHeader("Content-Type", "text/plain");

//   // res.end("Hello World\n");
// });

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/second", function(request, response) {
  response.sendFile(__dirname + "/second.html");
});

server.listen(3000, "localhost", function() {
  console.log("Server running");
});
