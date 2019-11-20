const Article = require("./../models/article.model");

module.exports.form = (req, res) => {
  res.render("form.ejs");
};

module.exports.new = (req, res) => {
  let article = new Article(req.body);
  article.save((e, data) => {
    if (e) {
      console.log(e);
      return res.status(400).json({ msg: "All fields needed" });
    }
    return res.status(200).json({ article: data });
  });
};

module.exports.read = (req, res) => {
  Article.find({ _id: request.params.id }, function(err, data) {
    if (err) {
      return response.status(400).json({ msg: "Could not query the db" });
    }
    console.log(data);
    return response.render("article.ejs", {
      article: data[0]
    });
  });
};
