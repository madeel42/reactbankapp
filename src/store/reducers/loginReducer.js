import loginService from './../../services/loginService';
import accountService from './../../services/accountServices';

let initialData = {
    loggedInUser: {
        transactions: [
        ],
    },
    inProcess: false,
    users: [],

};


let obj = {};

var data = "city";

obj[data] = "adeel"

function updateUser(users, user) {

    let targetUser = users.find((nUser) => {

        return nUser.id == user.id;

    })

    let tUser = users.indexOf(targetUser);

    users[tUser] = user
}


export function SignupReducer(state = initialData, action) {

    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {

        case 'item-Updated':
            accountService.updateAccount(action.payload, action.ctx);
            break;
        case 'ITEM_DELETE':
            accountService.deleteAccount(action.payload, action.ctx);
            break;

        case 'TRANSACTION_UPDATED':
            newState.loggedInUser.transactions[action.payload.index].transactionAmount = action.payload.updatedAmount;
            updateUser(newState.users, newState.loggedInUser);
            return newState;
            break;
        case 'Edit_Tranasaction':

            if (newState.loggedInUser.transactions[action.target].nature == 'Deposit') {
                newState.loggedInUser.amount -= +newState.loggedInUser.transactions[action.target].transactionAmount;
            }
            else {
                newState.loggedInUser.amount += +newState.loggedInUser.transactions[action.target].transactionAmount;

            }
            updateUser(newState.users, newState.loggedInUser);

            return newState
            break;
        case 'DELETE_TRANSACTION':
                // accountService.deleteTransactions(action.target,action.ctx);

            if (newState.loggedInUser.transactions[action.target].nature == 'Deposit') {
                newState.loggedInUser.amount -= +newState.loggedInUser.transactions[action.target].transactionAmount;
            }
            else {
                newState.loggedInUser.amount += +newState.loggedInUser.transactions[action.target].transactionAmount;

            }
            newState.loggedInUser.transactions.splice(action.target, 1);
            updateUser(newState.users, newState.loggedInUser);
            return newState;
            // break;


        case 'persist/REHYDRATE':
            if (action.payload) {
                newState = action.payload.SignupReducer;
                updateUser(newState.users, newState.loggedInUser);
            }
            break;

        case "Withdraw":
            loginService.withdraw(action.payload);

            // newState.loggedInUser.amount -= +(action.payload.amount);

            // newState.loggedInUser.transactions.push(action.payload);
            // updateUser(newState.users, newState.loggedInUser);

            return newState
            break;

        case "Deposit":
            loginService.deposit(action.payload);

            //     newState.loggedInUser.amount += +(action.payload.amount);
            //     newState.loggedInUser.transactions.push(action.payload);
            //     updateUser(newState.users, newState.loggedInUser);

            //     return newState
            break;
        case "TRANSACTION_WITHDRAW":
            newState.loggedInUser.transactions.push(action.data);
            newState.loggedInUser.amount -= +(action.data.transactionAmount);
            action.data.remainingBalance = newState.loggedInUser.amount;

            return newState

        case "TRANSACTION_DEPOSITED":
            newState.loggedInUser.transactions.push(action.data);
            newState.loggedInUser.amount += +(action.data.transactionAmount);
            action.data.remainingBalance = newState.loggedInUser.amount;
            
            return newState

        case "CREATING_USER":
            loginService.signup(action.data);

            // newState.users.push(action.data);

            // alert("User created");
            // updateUser(newState.users, newState.loggedInUser);
            // action.ctx.props.history.push('/');



            break;
        case "loginsuccess":
            newState.loggedInUser = action.data;
            return newState;

        case "USER_LOGGING_IN":
            loginService.login(action.data, action.ctx);
            //         let userFound = newState.users.find((user) => {
            //             if (user.name == action.data.name && user.password == action.data.password) {
            //                 return true
            //             }
            //         });
            //         if (userFound) {
            //             newState.     userFound;
            //             alert("User found");
            //             action.ctx.props.history.push('/info');
            //             return newState;
            //         } else {
            //             alert("User not found");
            //         }
            // }
            // return newState;
            break;
    }
    return newState;
}





































// export function loginReducer(state = LoggedIn, action) {

//     if (action.type == 'sending') {
//         return action.data

//     }
//     return state.Logged.user

// }

// export function displayReducer(oldData = LoggedIn, action) {
//     if (action.type == 'show') {
//         return {
//             status: true
//         }

//     }

//     else if (action.type == 'hide') {
//         return {
//             status: false
//         }
//     }
//     return oldData
// }

// export function dashBoardReducer(state, action) {
//     return {
//         type: 'cghh',

//     }
// }

