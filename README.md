# yelpBot

A Slack Bot for Yelp results

Search for something like `Pizza near Hawaii` and yelpBot will suggest a restaurant!

## Initial Setup

- Get [Yelp API credentials](https://www.yelp.com/developers/manage_api_keys)
- Setup a [Slack Outgoing Webhook](https://peloruslabs.slack.com/services/new)
- Save a copy of `.env-sample` as `.env` and replace the config variables with your Yelp and Slack credentials
- To test locally, run `foreman start`

## Webhook Setup

- Set the "Trigger Word(s)" to "yelpbot"
- Set the "URL(s)" to wherever your node app is hosted, e.g. https://website.com/yelp
- If you haven't already, use the "Token" string as the value of TOKEN in your `.env` file