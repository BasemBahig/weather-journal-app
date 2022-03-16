/* Global Variables */
// Create a new date instance dynamically with 
//second update after first project review to add temp unit format:
const apiKey = `&appid=bb5d712c09d300043212d93e1d3bad05&units=imperial`;
let baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=`;

let d = new Date();
//old newDate before preview my project
//let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
//The required update
let newDate = d.getMonth()+ 1 + '.' +d.getDate()+'.'+d.getFullYear();



//add Eventlistener
 document.getElementById('generate').addEventListener('click', applyAction);
//function used (called) by eventlistner
function applyAction(){
    const addZip= document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeatherData(baseURL,addZip, apiKey)
    .then(function(data) {

        //as suggested in second review I added alerts as follows
        if(addZip!=null && feelings!=null){
            console.log(data);
            alert("ZipCode & Feelings retrieved successfully");
        }else{
            alert("something is wrong");
        }
        //adding data to the post request
        postData('/add', {temp:data.main.temp, content:feelings, date: newDate});
        //Check
        updateMyUI();
    })
};
//Function to Get API data
//Using async, await via fetch as per the project rubrics
const getWeatherData = async (baseURL,zip, key)=>{
    const res = await fetch(baseURL + zip + key);
    try{
        const data = await res.json();
        return data;
    }catch(error){
        //to alarm in console in case error
        console.log("error", error);
    }
}
//Function to post Data using fetch
const postData = async (baseURL='', data = {})=>{
    console.log(data);
    const response = await fetch(baseURL, {
        method: 'POST',
        credentials: "same-origin",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        });
    try{
        const newData = await response.json();
        console.log(data);
        return newData;
    }catch(error) {
        console.log("error", error);

    }
}
//function to Get Reuqired Project Data and update UI
const updateMyUI = async ()=>{
    const request = await fetch('/all');
    try{
        const all= await request.json();
        document.getElementById('date').innerHTML= `Date is : ${newDate}`;
        document.getElementById('temp').innerHTML = `Temp is :${all.temp}`;
        document.getElementById('content').innerHTML = `My Feels : ${all.content}`;
        if(temp==undefined && !content){
            console.log("Temp is undefined");
        } else{ 
            console.log("Temp and content retreived");
        }
    } catch(error){
        console.log("error", error);
    }
}