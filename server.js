var http = require("http");
const express = require("express");
const app = express();
const server = http.Server(app);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const mongo = require("mongodb");
app.use(bodyParser.urlencoded({ extended: true }));
require("./routes/articles.routes")(app);

var db,
  uri =
    "mongodb+srv://user_0:papponi312@cluster0-vq45a.mongodb.net/mongoosedbms";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("error", e => {
  console.log("Can't connect to dbms");
});

// mongo.MongoClient.connect(
//   uri,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   },
//   (err, client) => {
//     if (err) {
//       console.log("No can connect to db");
//     } else {
//       console.log("Connected to DB");

//       db = client.db("node-cw9");
//     }
//   }
// );

// var save = form_data => {
//   db.createCollection("articles", (err, result) => {
//     var collection = db.collection("articles");
//     collection.save(form_data);
//   });
// };

let articles = [];

app.post("/new_article", (request, response) => {
  // save(request.body);
  console.log(request.body);

  let article = new Article(request.body);
  article.save((e, data) => {
    if (e) {
      return response.status(400).json({ msg: "All fields needed" });
    }
    return response.status(200).json({ article: data });
  });
  // articles.push(request.body);
  // console.log(articles);
  // console.log(request.body.title);
  // console.log(request.body.content);

  // response.json({ msg: "successfully received" });
});

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/second", function(request, response) {
  response.sendFile(__dirname + "/views/second.html");
});

app.get("/new", function(request, response) {
  response.sendFile(__dirname + "/views/form.html");
});

// app.get("/article/:index", (req, res) => {
//   if (articles[req.params.index]) {
//     res.render("article.ejs", {
//       article: articles[req.params.index]
//     });
//   } else {
//     res.json({ msg: "Article not found" });
//   }
// });

app.get("/article/:id", (req, res) => {
  // console.log(articles[req.params.id]);

  if (req.params.id) {
    Article.find({ _id: req.params.id }, (e, data) => {
      if (e) {
        return res.status(400).json({ msg: "Can't find result" });
      }
      // console.log(data[1]);

      return res.render("article.ejs", {
        article: data[0]
      });
    });
  } else {
    res.json({ msg: "Article not found" });
  }
});

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

server.listen(3000, "localhost", function() {
  console.log("Server running");
});
