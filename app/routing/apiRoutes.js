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
        res.json(idealFriend);
    })
};  