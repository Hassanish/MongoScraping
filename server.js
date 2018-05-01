var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var db = require("./models");

var PORT = process.env.PORT || 8080;

var app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));

app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/mongoScraper");

var databaseUri = 'mongod://localhost/week18day3mongoose';

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(databaseUri);
}
 var monDB = mongoose.connection;

 monDB.on('error', function(err) {
   console.log('Mongoose Error: ', err);
 });

 monDB.once('open', function() {
   console.log('Mongoose connnection successful.');
 });

var scrapePage = require("./controllers/scrape.js");

require("./routes/view/htmlRoutes")(app);

app.get("/scrape", scrapePage);

app.get("/articles", function(req, res) {

  db.Headline.find({})
    .then(function(dbHeadline) {
      res.json(dbHeadline);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/saved", function(req, res) {
  console.log("Getting Saved Articles");

  db.Headline.find({
    saved: true
  })
  .then(function(dbHeadline) {
    res.render("saved", {headline: dbArticle})
  })
  .catch(function(err) {
    res.json(err);
  });
});
app.get("/articles/:id", function(req, res) {

  db.Headline.findOne({
    _id: req.params.id
  })
  .populate("note")
  .then(function(dbHeadlineById) {
    res.json(dbHeadlineById);
  })
  .catch(function(err) {
    res.json(err);
  });
});
app.put("/articles/:id/:saved", function(req, res) {
 console.log(req.param.id)
  db.Headline.findOneAndUpdate({ _id: req.params.id }, {$set:{ saved: req.params.saved}}, { new: true })
      .then(function(dbHeadline) {
        console.log("Saved an article");
        res.json(dbHeadline);
      })
      .catch(function(err) {
        res.json(err);
      });
  }); 

app.post("/articles/:id", function(req, res) {

  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Headline.findOneAndUpdate({ _id: req.params.id }, {note: dbNote._id }, { new: true });
    })
    .then(function(dbHeadline) {
      res.json(dbHeadline);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
