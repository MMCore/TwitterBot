# TwitterBot

# Requirements
- Node (https://nodejs.org/en/)

- Twit (npm install twit)

- Twitter API access through your twitter account (Visit: https://dev.twitter.com/ to set up consumer and access keys/tokens) 

- Update the config.js file with the keys/tokens you set up for your app.

- Update the ID field in the config.js file. (You can find your ID here: http://gettwitterid.com/)


# Features (While Bot is Running):
- Anytime someone follows your account, the bot will automatically follow them. 

- Anyone you follow manually or using the bot will be tracked using a dictionary, containing recent followings. Anyone that you have followed for over a week will be automatically unfollowed.

- The Dictionary is stored in a text file - this means that the bot can be restarted/paused without losing data.  


# Suggestions:
- To reduce errors, such as: Exceeding the Twitter API restrictions, avoid following too many people at once. 

- Host the bot using an external server to guarantee consistent, reliable uptime.

- Set up automatic restarts for the bot, in the case of error. I recommend: PM2 (Node process manager), it allows you to manage multiple bots, provides automatic restarts and allows you to log output and errors.  (npm install pm2 -g)
