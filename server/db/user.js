const mongoose = require('mongoose');
let Transaction = require('./transaction');

mongoose.connect('mongodb://localhost:27017/fruitDB', function (err, data) {

    console.log(err || data);

});

// const PI = 3.142;
// const gravity = 9.8;
// const wife = 1;

const userSchema = mongoose.Schema({

    name: String,
    email: String,
    password: String,
    dob: String,
    User: String,
    nature: String,
    type: String,
    transactionAmount: Number,
    Id: Number,
    date: String,
    remainingBalance: {
        type: Number,
        default: 0
    },
    amount: {
        type: Number,
        default: 0
    },
    transactions: [],
    // info:[],
    // Whose_Transact_amount:[],
    who_transact_amount: {
        who_Deposit: [],
        who_Withdraw:[],
    }

});

const User = mongoose.model('user', userSchema);
//  Users.findByIdAndUpdate(userId,
//         {$push: {transactions: transaction}},
//         {safe: true, upsert: true},
//         function(err, doc) {
//             if(err){
//             console.log(err);
//             }else{
//             // do stuff
//             }
//         }
//     );
module.exports = User;