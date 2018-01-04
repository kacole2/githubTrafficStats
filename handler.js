'use strict';

module.exports.run = (event, context, callback) => {

  function ghCred(){
    github.authenticate({
      type: "oauth",
      token: process.env.GHTOKEN
    });
  }

  var viewCounts,
      cloneCounts;

  const today = new Date().toISOString().slice(0, 10);
  const GitHubApi = require("github");

  const github = new GitHubApi({
    debug: true,
    protocol: "https",
    timeout: 5000
  });

  ghCred();
  github.repos.getViews({
    owner: process.env.GHOWNER,
    repo: process.env.GHREPO
  }, function(err, res) {
      if (err) {
        return console.error(err);
      } else {
        var viewsArray = res.data.views
        if (viewsArray.length > 0) {
          var lastViewDay = viewsArray[viewsArray.length - 1]
          var day = lastViewDay.timestamp
          day = day.substring(0, day.indexOf('T'));
          if (day == today){
            viewCounts = lastViewDay.count
            var uniques = lastViewDay.uniques
            console.log("Today is: " + day + " View counts are: " + viewCounts + " Unique Views are: " + uniques)
          } else {
            viewCounts = 0
            console.log("Today is: " + day + " View counts are: " + viewCounts)
          }
        } else {
          viewCounts = 0
          console.log("There's never been a view")
        }
      }
  });

  ghCred();
  github.repos.getClones({
    owner: process.env.GHOWNER,
    repo: process.env.GHREPO
  }, function(err, res) {
      if (err) {
        return console.error(err);
      } else {
        var countsArray = res.data.clones
        if (countsArray.length > 0) {
          var lastCountDay = countsArray[countsArray.length - 1]
          var day = lastCountDay.timestamp
          day = day.substring(0, day.indexOf('T'));
          if (day == today){
            cloneCounts = lastCountDay.count
            var uniques = lastCountDay.uniques
            console.log("Today is: " + day + " Clone counts are: " + cloneCounts + " Unique Clones are: " + uniques)
          } else {
            cloneCounts = 0
            console.log("Today is: " + day + " Clone counts are: " + cloneCounts)
          }
        } else {
          cloneCounts = 0
          console.log("There's never been a clone")
        }
      }
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: today + " had " + viewCounts + " views and " + cloneCounts + " clones.",
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the   
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
