let Plocal = require('passport-local').Strategy;
let passport =require('passport');
// let UsersData = require('./data');
let User= require("./db/user");
let OurStrategy = new Plocal({

  usernameField:'name'
},(userName, password, nextٖ) => {
    let userFound = User.findOne({
      name:userName,
      password:password
    }, (err, userFound) => {


      if (userFound) {
        console.log("User is authorized to enter")
          nextٖ(null, userFound)
      }else{
  
        nextٖ(null, undefined);
      }

        // return (userName == user.name && password == user.password) 

        
    })
   

});
passport.use(OurStrategy);

console.log("Authentication is Enabled");