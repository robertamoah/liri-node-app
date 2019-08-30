require("dotenv").config();

var keys = require("./keys.js");

// console.log(keys)
var Spotify = require('node-spotify-api')

// convert the time
var moment = require('moment');

var axios = require("axios");

var fs = require("fs")


var appCommand=process.argv[2];

var userSearch=process.argv.slice(3).join(" ");



function liriRun(appCommand, userSearch){
    switch(appCommand){
    case "concert-this":
    getBandsInTown(userSearch);break;
    case "movie-this":
    getOMDB(userSearch);
    break;

    case "do-what-it-says":
    getRandom();
    break;

    case "spotify-this-song":
    getSpotify();
    break;
        

    default:
            console.log("enter one of these options commads: 'concert-this', 'spotify-this-song', 'movie-this'")
    
    }
}













// axios call bandsintown api////////////////////////////////

function getBandsInTown(artist){
var artistName = userSearch;

var URL= "https://rest.bandsintown.com/artists/" + artistName+ "/events?app_id=codingbootcamp"

axios.get(URL).then(function (response) {


    console.log("============================================")
    console.log("Name of the venue is: "+response.data[0].venue.name + "\r\n");
    console.log("venue location: " + response.data[0].venue.city + "\r\n")

    var dates = response.data[0].datetime
    console.log("Date of event: " + moment(dates).format("MM-DD-YYYY") + "\r\n")



    var logConcert="========Concert=========" + "\nName of the musician: " + artist + "\nName of the venue: "+ response.data[0].venue.name + "\r\n"+ "venue location: " + response.data[0].venue.city  + "\nDate of the event: "+ moment(dates).format("MM-DD-YYYY")+ "\r\n"+"============================================"+"\r\n" 
    fs.appendFile("log.txt", logConcert, function(err){
        if(err) throw err;
    });




})


    
}
// //////////////////////////////////////////////////////////










// OMD api call//////////////////////////////////////////////



// We then run the request with axios module on a URL with a JSON

function getOMDB(movie){
    if(!movie){
        movie="Mr. Nobody";
    }

 var URL="http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"

axios.get(URL).then(
  function(response) {

    console.log("============================================")
    // Then we print out the imdbRating
    console.log("Title: " + response.data.Title+ "\r\n")

    console.log("year:Release: " + response.data.Year+ "\r\n")

    console.log("IMDB Ratings: " +response.data.imdbRating+ "\r\n")

    console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value + "\r\n")

    console.log("Country: "+ response.data.Country+ "\r\n")
    
    console.log("Language: "+ response.data.Language + "\r\n")

    console.log("Plot: "+ response.data.Plot+ "\r\n")

    console.log("Actors: "+ response.data.Actors+ "\r\n")


var logMovie = "========Movie=========" + "\nMovies tiltle: " + response.data.Title + "\nyear released: " + response.data.Year+ "\r\n" + 
"Actors: "+ response.data.Actors+ "\r\n"+

"Rotten Tomatoes: " + response.data.Ratings[1].Value + "\r\n"
+
"Country: "+ response.data.Country+ "\r\n"
+"==============================="+"\r\n" 

fs.appendFile("log.txt", logMovie, function(err){
    if (err) throw err;
});
});

};


function logResult(data){
    fs.appendFile("log.txt", data,function (err){
        if(err)throw err;
    })
}


// //////////////////////////////////////////////////////////








// console.log(keys)
// spotiy/////////////////////////////////////////////////
function getSpotify(songName){
    var spotify=new Spotify(keys.spotify);

    if(!userSearch===''){
        userSearch= "The sign";

    };
    spotify.search({type: "track", query:userSearch}, function (err,data){
        if(err){
            return console.log("Error occured: "+ err); 
        }

        console.log("====================================")

        console.log("Artist(s) Name: " + userSearch);

        console.log("song name: " + data.tracks.items[0].name + "\r\n");

        console.log("Song Preview Link: " + data.tracks.items[0].href + "\r\n");

        console.log("Album: " + data.tracks.items[0].album.name + "\r\n");

        var logSong="=====Spotify===" + "\nArtist: " + userSearch
        

     

        fs.appendFile("log.txt", logSong, function(err){

        
        if(err) throw err;
        });
    });
};

liriRun(appCommand, userSearch)