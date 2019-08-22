import myFunction from '../store/store';


let login = {
    login(data, ctx) {


        let store = myFunction().store;


        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            // body: JSON.stringify({
            //     username: 'ali',
            //     password: '123'
            // })
        }).then((resp) => {
            return resp.json();
        }).then((resp) => {
            console.log(resp);
            if (resp.success) {

                store.dispatch({
                    type: "loginsuccess",
                    data: resp.user
                })
                alert("userFound");
                ctx.props.history.push('/info');
            } else {
                alert("current user not found")
            }
        })

    },

    deposit(data) {
        
        let store = myFunction().store;
        fetch('/deposit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then((resp) => {
            return resp.json()


        }).then((resp) => {
            console.log(resp);
            store.dispatch({
                type:"TRANSACTION_DEPOSITED",
                data:resp.transaction
            })
            if(resp.success){
                alert("transaction OK");
            }
        })

    },
    withdraw(data) {
        
        let store = myFunction().store;
        fetch('/withdraw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            
        }).then((resp) => {
            console.log(resp);
            return resp.json()


        }).then((resp) => {
            console.log(resp);
            store.dispatch({
                type:"TRANSACTION_WITHDRAW",
                data:resp.transaction
            })
            if(resp.success){
                alert("transaction OK");
            }
        })

    },
    signup(data) {


        // let fData = new FormData();
        // fData.append("name", data.name)
        // fData.append("email", data.email)
        // fData.append("amount", data.amount)
        // fData.append("dob", data.dob)
        // fData.append("password", data.password)
        // fData.append("gender", data.gender)
        // fData.append("userdp", data.selectedFile)
        fetch('/signup', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),

            // body: fData
        }).then((res) => {
            return res.json()
        }).then((resp) => {

            if (resp.success) {
                alert("User created");
            }

        });

    }
}


export default login;