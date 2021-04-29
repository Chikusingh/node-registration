const { to,TE,createPassword } = require('../service/service');
const validator = require('validator');
const Sequelize = require('sequelize');   
const Op = Sequelize.Op;                   //to use sequelize operators
const { User }  = require('../models');

//validateUser check if user with given email exist in database or not
const validateUser =  async (usermail) => {
      let user;
      if(validator.isEmail(usermail)){
          [err, user] = await to(User.findOne({where:{EMAIL_ID:usermail},raw:true}));
      }
      return user;
  }
  module.exports.validateUser = validateUser;

  const authUser = async function(usermail,password){        //authenticate User 
      if(!usermail) TE('Please enter an email or phone number to login');
      if(!password) TE('Please enter a password to login');
      let user;
  
      var pwd = createPassword(password);
  
      if(validator.isEmail(usermail)){
            [err, user] = await to(User.findOne({where:{EMAIL_ID:usermail,PASSWORD:pwd},raw:true}));
      }
      else{
          TE('A valid email or phone number was not entered');
      }
      //if(!user) TE('Not registered');
     // else  
     return user;   
  }
  module.exports.authUser = authUser;