var Twit = require('twit')
var fs = require('fs')
var config = require('./config.js')
var T = new Twit(config.access)
var stream = T.stream('user')

//Dictionary Storing Id's(Keys) and Times(Values) When They Followed You
var followArray = JSON.parse(fs.readFileSync("dict.txt").toString())

//Listening For Follow Events
stream.on('follow', followPerson)

//Unfollowing People After Set Time
setInterval(function removeUnfollower(){
  if(Object.keys(followArray).length === 0){
      console.log('followArray is empty.')
  }else{
    console.log(followArray)
    for(var key in followArray) {
      //Testing Friendship After Specified Time
      if(Date.now() - followArray[key] > 604800000){
          console.log('Attempting Unfollow')
          unfollowPerson(key,followArray)
        }
      }
    }
}, 10000)

//Follows Anyone Who Follows You And Stores Them In the followDict
function followPerson(event){
  if(event.source.id_str != config.MYID.ID){    //Ignores when I follow people
    T.post('friendships/create', { id: event.source.id_str }, function(err, data, response) {
      if(err){
        console.log(err)
      }else{
        console.log('Followed ' + event.source.id_str )
        followArray[event.source.id_str] = Date.now()
      }
    })
  }else{
    console.log('I followed')
    followArray[event.target.id_str] = Date.now()
  }
  fs.writeFile('dict.txt',JSON.stringify(followArray), function (err) {
    if (err) throw err
    console.log('Dictionary Updated')
  })
}

function unfollowPerson(id_str){
  T.post('friendships/destroy', { id: id_str }, function(err, data, response) {
    if(err){
      console.log(err)
    }else{
      delete followArray[id_str]
    }
    fs.writeFile('dict.txt',JSON.stringify(followArray), function (err) {
      if (err) throw err
      console.log('Dictionary Updated!')
    })
  })
}
