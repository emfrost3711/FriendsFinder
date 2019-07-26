// Your `apiRoutes.js` file should contain two routes:

// * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
// * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.


var friends = require("../data/friends");


module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.send(friends)
    });

    app.post("/api/friends", function(req, res) {
        friends.push(req.body);
        var user = req.body;
        var totalDifference = 1000; 
        var idealFriend = {};
        friends.forEach (function (friend, index) {
            var userScores = user.scores;
            var friendsScores = friend.scores; 
            var scoreDifferences = [];
            for (var i = 0; i < friend.scores.length; i++) {
                var tempNum = (user.scores[i] - friend.scores[i]);
                scoreDifferences.push(tempNum);
            }
            
           var tempTotalDifference = scoreDifferences.reduce(function (total, currentValue) {
                
                return (total + currentValue)
            }) 
            if (tempTotalDifference < totalDifference) {
                totalDifference = tempTotalDifference; 
                idealFriend = {
                    name: friend.name, 
                    photo: friend.photo
            }}
        }) 
        //need to compare the total difference with something else to determine 
        res.json(idealFriend);
    })
};  




// Determine the user's most compatible friend using the following as a guide:

// Convert each user's results into a simple array of numbers (ex: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]).
// With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the totalDifference.

// Example:
// User 1: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]
// User 2: [3, 2, 6, 4, 5, 1, 2, 5, 4, 1]
// Total Difference: 2 + 1 + 2 = 5

// Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both 5-3 and 3-5 as 2, and so on.
// The closest match will be the user with the least amount of difference.

// Once you've found the current user's most compatible friend, display the result as a modal pop-up.

// The modal should display both the name and picture of the closest match.


//   // Displays a single character, or returns false
//   app.get("/api/characters/:character", function(req, res) {
//     var chosen = req.params.character;
//     console.log(chosen);
//     for (var i = 0; i < characters.length; i++) {
//       if (chosen === characters[i].routeName) {
//         return res.json(characters[i]);
//       }
//     }
  
//     return res.json(false);
//   });
  
//   // Create New Characters - takes in JSON input
//   app.post("/api/characters", function(req, res) {
//     // req.body hosts is equal to the JSON post sent from the user
//     // This works because of our body parsing middleware
//     var newcharacter = req.body;
  
//     console.log(newcharacter);
  
//     // We then add the json the user sent to the character array
//     characters.push(newcharacter);
  
//     // We then display the JSON to the users
//     res.json(newcharacter);
//   });