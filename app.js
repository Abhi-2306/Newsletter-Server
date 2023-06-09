const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
//const mailchimp = require("@mailchimp/mailchimp_marketing");


const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
})
app.post("/",function(req,res){
  const firstName=req.body.fname;
  const secondName=req.body.lname;
  const email=req.body.email;
  console.log(firstName+secondName+email);

  const data = {
    members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: secondName
      }
    }
    ]
  }
  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/cf1bdbf1ae";
  const options = {
    method: "POST",
    auth: "abhi1:97b84cd93b1f2376334ecb3484f7b887-us21"
  }

  const request=https.request(url, options, function(response){

    if(response.statusCode === 200)
    {
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data",function(data){
        console.log(JSON.parse(data));
    });
  })
  request.write(jsonData);
  request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/")
})









app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000");
});
// API key
// 97b84cd93b1f2376334ecb3484f7b887-us21
//List id
//cf1bdbf1ae
