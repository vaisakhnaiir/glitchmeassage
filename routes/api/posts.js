const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const Ninja = require('../server/../models/ninja');
async function loadPostsCollection(){

const client = await mongoose.connect('mongodb://localhost/routine',{ useNewUrlParser: true,useUnifiedTopology: true });
mongoose.Promise = global.Promise;

return client;

}

const Schema = mongoose.Schema;
const GeoSchema = new Schema({
  type:{
    type:String,
    default:"Point"

  },
  coordinates:{
    type:[Number],
    createIndexes:"2dSphere"

  },


})


//create ninja schema
const NinjaSchema = new Schema({
  name:{
    type: String,
    required: [true,'Name field requires']
  },
  rank:{
    type:String
  },
  available:{
    type:Boolean,
    default:false
  },
  geomatry:GeoSchema

})
//create model
//model is collection in MongoDB
//here collection in mongodb is ninjas
const Ninja = mongoose.model('rani',NinjaSchema);
// get data from db
// router.get('/tried',function(req,res,next){
//   Ninja.find({}).then(function(data){
//     res.send(data);
//   })

  router.post('/tried',function(req,res,next){
  // console.log(req.body);

 // var ninja = New Ninja(req.body);
 // ninja.save();
 // or
 Ninja.create(req.body).then(function(senddata){
   console.log(req.body);
   console.log("created");
   res.send(senddata);
 }).catch(next);
  //
  // res.send({type:'POST',
  // name : req.body.name,
  // rank : req.body.rank

});

router.get('/tried',function(req,res){
  res.send("works fine dear");
})

router.get('/',async function(req,res){
  // res.send("heylo");
  const posts = await loadPostsCollection();
  // console.log(posts);
  res.send(await posts.find({}).toArray());
})

module.exports = router;
