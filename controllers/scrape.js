var cheerio = require("cheerio");
var axios = require("axios");
var db = require(".././models");

const scrapePage = function(req, res) {
    axios.get("https://www.nytimes.com/").then(function(response) {

        var $ = cheerio.load(response.data);

        $("article.theme-summary").each(function(i, element) {
            var result = {};
            
            result.title = $(this)
                .children("h2.story-heading")
                .children("a")
                .text();
            result.summary = $(this)
                .find(".summary")
                .text();
            result.link = $(this)
                .children("h2.story-heading")
                .find("a")
                .attr("href");

            if ( (result.title && result.summary && result.link) ) {   
                console.log(result)
            }





/*
// Making a request for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
request("https://www.theverge.com/tech", function(error, response, html) {
console.log("i am here")
  // Load the body of the HTML into cheerio
  var $ = cheerio.load(html);

  // Empty array to save our scraped data
  var results = [];

  // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
  $("h2.c-entry-box--compact__title").each(function(i, element) {
      console.log(element)
    // Save the text of the h4-tag as "title"


    // Find the h4 tag's parent a-tag, and save it's href value as "link"
   var link = $(element).parent().attr("href");
var title=$(element).text()
    // Make an object with data we scraped for this h4 and push it to the results array
    results.push({
     title:title,
      link: link
    });
  });

  // After looping through each h4.headline-link, log the results
  console.log(results);
});
*/








      db.Headline.create(result)
        .then(function(dbHeadline) {
          console.log(dbHeadline);
        })
        .catch(function(err) {
          return res.json(err);
        });
    });
    res.send("Scrape Complete");
  });
}

module.exports = scrapePage;