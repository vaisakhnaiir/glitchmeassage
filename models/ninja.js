const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//for location
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
module.exports = Ninja;
