//jshint esversion:6

const express= require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req,res){
  const query = req.body.cityName;
  const apiKey = "33b0d56934817a3d04ce0758f38a80c3";
  const unit = "metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit+"";

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const humidity = weatherData.main.humidity;



    const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
    console.log(temp);
    console.log(weatherDescription);

    res.write("<p>The Weather is currently "+ weatherDescription+ "</p>");
    res.write("<h1>The Temperature in "+ query+ " is "+ temp + " Degrees Celcius</h1>");
    res.write("<h3>Humidity is "+ humidity+ "</h3>");
    res.write( "<img src="+ imageURL+">");

    res.send();
  /*  const object={
      name:"rashmi",                         ///it will turns a javascript object into string
      favfood:"blackpapperChicken"
    }
  console.log(  JSON.stringify(object)); */
    });
  });
  //  res.send("server is up and running");   //we can not send two send in get

});






app.listen(3000, function(){
  console.log("server is running on port 3000");
});
