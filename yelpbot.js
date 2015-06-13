yelp = require("yelp").createClient({
  consumer_key: process.env.YELP_CONSUMER_KEY, 
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

slackToken = process.env.SLACK_TOKEN;

msgRegex = new RegExp(/(.+)\snear\s(.+)/);
sliceSize = 5; // max number of yelp results to randomly select from

searchYelp = function (msg, callback) {
  // parse a message like 'pizza NEAR boston'
  try {
    array = msg.match(msgRegex); // parse the message
    yelp.search({term: array[1], location: array[2]}, function(error, data) {
      if (error) {
        console.log(error);
      } else {
        // loop through the businesses
        businesses = data.businesses.slice(0, sliceSize-1);
        suggestedBusiness = businesses[Math.floor(Math.random()*businesses.length)];
        callback(suggestedBusiness);
      }
    });
  } 
  catch (e) {
    console.log(e);
    callback(null);
  }
}

module.exports = function (req, res, next) {
  console.log('Request received!');
  if(req.body.token != slackToken) return false; // make sure request came from our slack account
  msgText = req.body.text;
  yelpResult = searchYelp(msgText, function(suggestedBusiness) {
    business = suggestedBusiness;
    console.log(business);
    if (!business) {
      botPayload = {
        text : "No results for '" + msgText + "'...format searches like 'Pizza near Boston'"
      };
    } else {
      botPayload = {
        text : 'What about ' + '<' + business.url + '|' + business.name + '>' + '?'
      };
    }
    return res.status(200).send(botPayload);
  });
}