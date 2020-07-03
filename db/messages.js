const Joi = require('joi');
const db= require('./connection');

const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    subject : Joi.string().required(),
    message : Joi.string().max(500).required(),

    imageURL: Joi.string().uri({
      scheme:[
        /https?/
      ]
    })
  })
  //messages is the table name
const messages = db.get('messages');

function getAll(){
  return messages.find();
}

function create(message){
  const result = Joi.validate(message, schema);
  if(result.error == null){
    //for date of creation purpose
    message.created = new Date();
    //insertion here
    return messages.insert(message);
  }else{
    return Promise.reject(result.error);

  }

}

module.exports = {
  create,
  getAll

};
