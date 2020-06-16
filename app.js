const express = require("express");
const https = require ("https");
const app = express();
const bodyParser= require("body-parser");
// var path = require('path');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
res.sendfile( __dirname +"/index.html");
});

app.post("/", function(req, res){
  const querry = req.body.nameCity;
  const unit = "metric";
  const apiId= "1508ba0f0c217f071af48b29dd899a60";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+querry+"&appid="+apiId+"&units="+unit;

  https.get(url, function(response){
    // console.log(response);
    response.on("data", function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const feelLike= weatherData.main.feels_like;
    console.log(temp);
    console.log(feelLike);
    res.write("<p> the temperature feel like as : " + feelLike + "</p>")
    res.write("<h1>The temperature of "+querry+" is : " + temp +"c </h1>");
    res.send();
    // console.log(ducument.getElementById("h1"));
    // res.sendfile(path.join( __dirname +'/index.html'));
  });
  });

});

app.listen(3000, function(){
  console.log("Server is Listening at port 3000");
})
