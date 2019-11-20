module.exports = function(app) {
  var articleController = require("./../controllers/article.controller");

  app.get("/new", articleController.form);
  app.post("/new_article", articleController.new);
  app.get("/article/:id", articleController.read);
};
