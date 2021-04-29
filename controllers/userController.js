const {User} = require("../models");
const {to,ReE,ReS,createPassword} = require("../service/service");
const authService  = require('../service/authService');
var moment = require('moment');
const validator    = require('validator');

////////////User registration///////////

const signup = async(req,res) =>{
    const userInfo = req.body;
    var email_id = userInfo.EMAIL_ID;
    var full_name = userInfo.FULL_NAME;
    var password = userInfo.PASSWORD;
    var gender = userInfo.GENDER;
    var dob = userInfo.DATE_OF_BIRTH;
    var Phone_number = userInfo.PHONE_NUMBER;

    if(!email_id)
    {
      return ReE(res, 'Enter Valid email', 422);
    }
    if(!(validator.isEmail(email_id)))
    {
     return ReE(res,'Enter Valid email',422);
    }
    if(!full_name){
      return ReE(res,'Enter Your Name',422);
    }
    if(!Phone_number){
      return ReE(res, 'Enter Valid Mobile Number', 422);
    }
    if(!(validator.isMobilePhone(Phone_number)) || (Phone_number<1000000000 || Phone_number>9999999999)){
            return ReE(res, 'Enter Valid Mobile Number', 422);
            }
    if(!(password) || (password.length<8))
      {
        return ReE(res, 'Enter valid password and minimun 8 character long', 422);
      }
    var pwd= createPassword(password);        
    password=pwd;
    let err,userExist
      [err, userExist] = await to(authService.validateUser(userInfo.EMAIL_ID));   //to check if user already exist or not
      if(err) { ReE(res,err,422);}
      if(userExist){
            return ReE(res,'User already exist with same email', 422); 
      }
    let getData;
    [err,getData] = await to(User.create({EMAIL_ID:email_id,FULL_NAME:full_name,PASSWORD:password,GENDER:gender,DATE_OF_BIRTH:dob,PHONE_NUMBER:Phone_number}));
    
    if(err) return ReE(res,err,422);
       return ReS(res,"User has been successfully register",200);
 
       
}
module.exports.signup = signup;


////////////user login////////

const login = async(req,res)=>{
  const requestInfo = req.body;
  if(!requestInfo.usermail)
    return ReE(res,'enter valid email',422);
    if(!requestInfo.password)
     return ReE(res,'Invalid password',422);
     let user;
[err, user] = await to(authService.authUser(requestInfo.usermail,requestInfo.password));  //call authuser function from auth.services
if(err)  { return ReE(res, err, 422); } 
if(!user) { return ReE(res, 'Invalid User', 422); } 
if(user) {
      return ReS(res, user, 200);
   }
   else { return  ReS(res,'User Not exist',200); } 
}
module.exports.login = login;
