const express = require('express');
const app = express();

const bodyParser = require('body-parser');
 const cors = require('cors');
var morgan = require('morgan');



const messages = require('./db/messages');



// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/routine',{ useNewUrlParser: true,useUnifiedTopology: true });
// mongoose.Promise = global.Promise;


//miiddleware
app.use(bodyParser.json());
app.use(cors());

app.get('/jo',(req,res) => {
  // res.send("hi there boy");
  res.json({
    message: 'json data newbie'
  });
})

app.get('/messages',(req, res) => {
  messages.getAll().then((messages) => {
    res.json(messages);
  })

})



app.post('/messages', (req, res) => {
  console.log(req.body);
  messages.create(req.body).then((senddata)=>{
  res.json(senddata);
 }).catch((error) => {
   res.status(500);
   res.json(error);

})

})



const posts = require('./routes/api/posts');
//what url hasto be there
 app.use('/api/posts',posts);


const port = process.env.PORT || 5000;

app.listen(port,function(req,res){
  console.log("its ready go !!");
})
