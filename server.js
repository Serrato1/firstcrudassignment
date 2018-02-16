let express = require('express') ;
let fs = require('fs');
let path =require('path');
let app = express();
let bodyParser = require('body-parser');
let port = process.env.port || 5000;
var guests = [{ name: 'Teagan' },{name: 'Noel'}];

// app.disable('x-powered-by');
// app.set('port', process.env.PORT || 5000);
// var morgan = require('morgan');
// app.use(morgan('short'));
// var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/',(req,res) => {
  console.log("GET Request Sent");
  res.sendStatus(200);
})

//Create user
app.post('/users/create/:name', (req,res)=>{
  console.log(req.params.name);
  var nameObj = {
    'name' : req.params.name
  };
  guests.push(nameObj);
  res.send(req.params.name);
})

//Get Users
app.get('/users', (req,res)=>{
  res.send(guests);
})
//Get Individual User
app.get('/users/:name', (req,res)=>{
  var usrSearch = 'not_found';
  guests.forEach((usr)=>{
    if(req.params.name.toLowerCase() === usr.name.toLowerCase()){
      usrSearch = usr;
    }
  })
  res.send(usrSearch);
})

app.put('/users/:name',(req,res)=>{
  res.send(200);
})

app.delete('/users/:name',(req,res) =>{
  guests = guests.filter((usr)=>{
    if(usr.name.toLowerCase() === req.params.name.toLowerCase()){
      console.log("FOUND");
      return false;
    }else{
      console.log("NOT FOUND",req.params.name.toLowerCase());
      return true;
    }
  })
  res.send(guests);
})

app.listen(port , function() {
  console.log('Listening on Port', port);
});
