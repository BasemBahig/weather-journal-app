// Setup empty JS object to act as endpoint for all routes
projectData = {};
//add baseURL in both server and client side as advised over fwd community:
const baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=`;
const apiKey = `&appid=bb5d712c09d300043212d93e1d3bad05&units=imperial`;
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser= require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
//body-Parser is deprecated and fwd communuty clarified and advised me:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3070;
const server =  app.listen(port, listening);
function listening(){
    console.log('server is up and running');
    console.log(`server is on via http://localhost:${port}`);  
}
//I found it good idea also to assign function first then use it to push the data
//guided by the Udacity project instructions and the below video:
//YouTube https://www.youtube.com/watch?v=-CZgW5ndSeQ

app.get('/all', pushData);

//call back function to complete GET/All
function pushData(req,res){
    res.send(projectData);
    //as mentioned above the below array instead of object to easy clean old data and load new data
    projectData =newData;
}

//Rout Post:
// assign function firstly in the rout then use it
app.post('/add', appendData)

function appendData(req, res) {
    //to see the body requested on log
  
    console.log(req.body);
  
    newData = {
      date: req.body.date,
  
      temp: req.body.temp,
  
      content: req.body.content,
    };
    projectData=newData;
    res.send(newData);
  }