//jshint esversion: 6

const express = require("express")
const bodyparser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express();

app.use(express.static("public"));  //this method allows us to use css in here as static file ,images,css
app.use(bodyparser.urlencoded({extended : true})) //it used to get data back from the form

app.get("/" , function(req , res){ 

    res.sendFile( __dirname + "/signup.html")

})

// 6166ede9e66cfb7967492530d76b18a6-us11
// e8cb5100a7

app.post("/" , function(req , res){

                 var fname = req.body.fname;
                 var lname = req.body.lname;
                 var email = req.body.email;

 var data = { //request body parameters in mailchimp
members:[
 {
email_address : email,
status : "subscribed",
merge_fields : {
    FNAME : fname,
    LNAME : lname
                }
 }      ]    }


var jsondata = JSON.stringify(data); //converts data in json format

const url = "https://us11.api.mailchimp.com/3.0/lists/e8cb5100a7";

var options = {
method : "POST",
    auth: "mailchimp285:6166ede9e66cfb7967492530d76b18a6-us11",
               }

const request = https.request(url ,options , function(responce){   
                    
if(responce.statusCode === 200){
    res.sendFile(__dirname + "/succes.html")
}else{
    res.sendFile(__dirname + "/failure.html")
}
                

                  responce.on("data" , function(data){
                      console.log(JSON.parse(data))
                    
                  })
                  })

                 request.write(jsondata);
                 request.end();

app.post("/failure" , function(req , res){ //this function redirects the the failure to home page
    res.redirect("/")
})




})

app.listen(3000 , function(){
    console.log("server for mail app is runnnig ")
})