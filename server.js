const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}:${req.method}:${req.url}:`;
  console.log(log);
  fs.appendFile('servers.log',log + '\n',(err)=>{
    if (err) {
      console.log('Unable to append file servers.log !');
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage:'Welcome to my page'
    // currentYear:new Date().getFullYear()
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page..'
    // currentYear: new Date().getFullYear()
  });
});

app.get('/me',(req,res)=>{
  res.send({
    Name: 'Sarang',
    Age: 23,
    Address: ['Wayand','Kerala']

  });
});

app.get('/bad',(req,res)=>{
  // res.send('<h1>Unable to get the request..!</h1>');
  res.send({
    errorMessage: 'Unable to handle the request'
  });
});

app.listen(3000,()=>{
  console.log('Server is up on port 3000');
});
