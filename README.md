# TwitterBot

#Requirements
-Node

-Twit (npm install twit)


#Features (While Bot is Running):
-Anytime someone follows your account, the bot will automatically follow them. 

-Anyone you follow manually or using the bot will be added to an array containing recent followers. Anyone that you have followed for over a week will be automatically unfollowed. 



#Suggestions:
-To reduce errors, such as: Exceeding the Twitter api restrictions, avoid following too many people at once. 

-Host the bot using an external server to guarantee consistant, reliable uptime.

-Set up automatic restarts for the bot, in the case of error. I recommend: PM2 (Node process manager), it allows you to manage multiple bots, provides automatic restarts and allows you to log output and errors.  (npm install pm2 -g)
