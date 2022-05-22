const express = require("express");
const bodyParser = require('body-parser');
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname +"/signup.html");

});

app.post("/", function(req, res){
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  };
   const jsonData = JSON.stringify(data);
   const url = "https://us10.api.mailchimp.com/3.0/lists/2e1fd9ab8d";

   const options = {
     method: "POST",
     auth: "rohit:6e40b6c8d99edf1a75e6c3e3d86010c7-us10"
   }

   const request = https.request(url, options, function(response){

     if(response.statusCode === 200){
       res.sendFile(__dirname + "/success.html");
     } else{

     }res.sendFile(__dirname + "/failure.html");
     response.on("data", function(data){
       console.log(JSON.parse(data));
     });

   });

   request.write(jsonData);
   request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running at 3000");
});

// API KEY
// 6e40b6c8d99edf1a75e6c3e3d86010c7-us10
// audience id
// 2e1fd9ab8d
