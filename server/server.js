// class Student{

// }
// module.exports=[1,2,3,45];
let authentication = require('./authentication');
let parser = require('body-parser');
let express = require('express');
var multer = require('multer')
let fs = require('fs');
let cookie = require('cookie-parser');
let session = require('express-session');
let passport = require('passport');
let User = require('./db/user')
let Transaction = require("./db/transaction");
// var upload = multer({ dest: 'server/uploads/' })
let server = express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.exists('server/uploads', function (exists) {
            if (!exists) {
                fs.mkdir('server/uploads', function (exists) {
                    cb(null, 'server/uploads')
                })
            }
            else {
                cb(null, 'server/uploads')

            }
        })

    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })



let users = [

];

server.use(parser.json());
server.use(parser.urlencoded());
server.use(cookie());
server.use(session({
    secret: "Hahahahaha"
}));
server.use(passport.initialize());
server.use(passport.session());
passport.serializeUser((user, next) => {
    console.log("User Logged in");
    next(null, user.id)
});
passport.deserializeUser((user, next) => {
    console.log("Interent Connection is Off");
    next(null, user)
})



server.get('/users', (req, res) => {

    res.json({
        myUsers: users
    });

});
let transact = [];
server.post('/withdraw', (req, res) => {
    // let transaction = new Transaction(req.body);
    let transaction = new User(req.body);
    //  let transactname = transact.filter((user)=>{
    transact.filter((user) => {
        //  return user.name;
        return transaction.who_transact_amount.who_Withdraw.splice(0, 1, user.name);
    })
    // if(transactname){
    //     transaction.who_transact_amount.who_Withdraw.push(transactname);
    // }
    // transaction.transactions.push(req.body);
    transaction.save(
        function (err, transaction) {
            res.json({
                message: err ? err.message : '',
                success: err ? false : true,
                transaction

            });
        }
    );
    console.log(req.body)
})

console.log(transact, 'transact arry');
server.post('/deposit', (req, res) => {
    // console.log(remainingBalance);
    // let info = [];
    // let transaction = new Transaction(req.body);

    let transaction = new User(req.body);
    transact.filter((user) => {
        return transaction.who_transact_amount.who_Deposit.splice(0, 1, user.name);
    })
    //  transaction.transactions.push(req.body);
    transaction.save(
        function (err, transaction) {
            res.json({
                message: err ? err.message : '',
                success: err ? false : true,
                transaction


            });
        }
    );
    console.log(req.body)

})
server.put('/updateAccount/:id', (req, res) => {

    users[req.params.id] = req.body;

    res.json({

        users: users,
        success: true
    });

});
server.get('/check', (req, res) => {
    res.json(req.user);
})
// server.get('/logout')
// server.delete('/removeAccount/:id', (req, res) => {
//     console.log(req.param.id);
//     let transaction = new Transaction(req.params.id);
//     transaction.splice(req.params.id, 1);

//     res.json({
//         success: true,
//         transaction
//     });
// let transaction = new Transaction(req.params.id);
// transaction.splice(req.params.id, 1);
// transaction.save(
//     function (err, transaction) {
//         res.json({
//             message: err ? err.message : '',
//             success: err ? false : true,
//             transaction


//         });
//     }
//     );
// res.json({
//     success: true,
//     transaction
// });

// })
server.delete('/removeaccount/:id', (req, res) => {

    console.log(req.params.id);

    users.splice(req.params.id, 1);

    res.json({
        success: true,
        users: users
    });

});

// server.use(parser.urlencoded());
server.post('/signup', upload.single('userdp'), function (req, res) {
    // users.push(req.body);
    let user = new User(req.body);
    transact.push(user);
    // user.transactions.info.push(req.body);
    user.save(
        function (err, user) {
            res.json({
                message: err ? err.message : '',
                success: err ? false : true,
                user

            });
        }
    );
    console.log(req.body)

    // users.push(req.body);

})
// server.post('/signup', (req, res) => {
//     console.log(req);
//     res.json({
//         success: true
//     })
//     // res.sendfile('./static/' + req.body.name + '.jpg')
// });

// server.get('/', function (req, res) {
//     console.log("i am Iron MAN")
//     // res.sendfile('./static/index.html')
// });
server.post('/login', passport.authenticate('local'), function (req, res) {
    // let userFound = users.find((user) => {
    //     return user.name == req.body.name && user.password == req.body.password

    // })
    if (!req.user) {
        res.status(404).json({
            success: false
        })
    }
    else {
        res.json({
            user: req.user,
            success: true
        })
    }
    // res.end("hello paa hi")
    // // console.log(req.headers)
    // console.log("i am SpiderMan")
    // console.log(req.query.fuck);

    // let userFound = users.find((user) => {
    //     return user.name == req.body.name && user.password == req.body.password;
    // });
    // if (!userFound) {
    //     res.status(404).json({ success: false });
    // }
    // else {
    //     res.json(userFound).json({ success: true });
    // }

    // res.sendfile('./static/olx.jpg');

});


server.use((err, req, res, next) => {
    res.status(500).json(err);
    console.log(err);
});
server.use(express.static('./build'));

server.listen(5000, () => {
    console.log("Server Started")
});