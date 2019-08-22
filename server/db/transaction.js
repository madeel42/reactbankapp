const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/fruitDB', function (err, data) {

//     console.log(err || data);

// });


const userSchema = mongoose.Schema({
    User:String,
    nature:String,
    type:String,
    transactionAmount:Number,
    Id:Number,
    date:String,
    remainingBalance:{
        type:Number,
        default:0
    }

})

    const Transaction = mongoose.model('transactions', userSchema);

//  User.findByIdAndUpdate('5d3aefa444af010bfc365c5a', {email:'system@gmail.com'}, (err, user)=>{

//         console.log(err || user);


//     })

    module.exports = Transaction;