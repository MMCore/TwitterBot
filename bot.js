var Twit = require('twit')
var config = require('./config.js')
var T = new Twit(config)
var stream = T.stream('user')
var MYID = '' //Enter Your ID Here e.g: '5425246167376373'

//Dictionary Storing Id's(Keys) and Times(Values) When They Followed You
var followArray = {}

//Listening For Follow Events
stream.on('follow', followPerson)

//Unfollowing People After Set Time
setInterval(function removeUnfollower(){
  if(Object.keys(followArray).length === 0){
      console.log('followArray is empty.')
  }else{
    console.log(followArray)
    for(var key in followArray) {
      //Testing Friendship After 15 sec
      if(Date.now() - followArray[key] > 86400000){
          console.log('Attempting Unfollow')
          unfollowPerson(key,followArray)

        }
      }
    }
}, 3600000)

//Follows Anyone Who Follows You And Stores Them In the followDict
function followPerson(event){
  if(event.source.id_str != MYID){    //Ignores when I follow people
    T.post('friendships/create', { id: event.source.id_str }, function(err, data, response) {
      if(err){
        console.log(err)
      }else{
        console.log('followed ' + event.source.id_str )
        followArray[event.source.id_str] = Date.now()
      }
    })
  }else{
    console.log('I followed!')
    followArray[event.target.id_str] = Date.now()
  }
}

function unfollowPerson(id_str,followArray){
  T.post('friendships/destroy', { id: id_str }, function(err, data, response) {
    if(err){
      console.log(err)
    }else{
      delete followArray[key]
    }
  })
}
