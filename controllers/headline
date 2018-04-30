var db = require("../models");

module.exports = {
    renderHome: function(req, res) {
        db.Headline.find({}, function(error, data) {
            
            var hbsObject = {
                headline: data
            }
            
            res.render("home", hbsObject);    
        })
          
    },
    renderSaved: function(req, res) {
        db.Headline.find({saved: true}, function(error, data) {
           
            var hbsObject = {
                headline: data
            }
            res.render("saved", hbsObject);
        })
    }

}
