import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { Link, Router, Route } from 'react-router-dom';
import Signup from '../src/SignUp';
import Login from '../src/Login';
import DashBoard from '../src/DashBoard';
import  cbh  from './history';
import myFunction from './store/store';

let store = myFunction().store



class UserComponent extends React.Component {

  state = {
    users: [

    ]
  }
  constructor(props) {
    super(props);
    fetch('/users').then((resp) => {

      return resp.json();

    }).then((resp) => {

      console.log(resp.myUsers);

      this.setState({
        users: resp.myUsers
      })

    });

  }
  updateAccount = (index) => {

    store.dispatch({
      type:'item-Updated',
      payload:index,
      ctx:this
    })
  }
  deleteAccount = (delIndex) => {


    store.dispatch({
     
      type:"ITEM_DELETE",
      payload:delIndex,
      ctx:this
    })

  }
  render() {
    return <table><h1>Users</h1>
      {this.state.users.map((user, index) => {
          return <tr>
            <td><input value={user.name} onChange={(evt) => {
              user.name = evt.target.value;
              this.setState({
                users: this.state.users
              })
            }} /></td>
            <td>{user.email}</td>
            <td>{user.password}</td>
            <td><button onClick={() => {
              this.deleteAccount(index)
            }}>DELETE</button></td>
            <td><button onClick={() => {
              this.updateAccount(index)
            }}>UPDATE</button></td>
          </tr>
        })
      }
    </table>


  }

}
export default class App extends React.Component {
  render = () => {
    return <Provider store={store}>
      <PersistGate loading={null} persistor={myFunction().persistor}>
        <Router history={cbh}>
        <div>
              <Link to="/">
                <img id='bankimg' src="bnk.jpg" className="imgcenter" />
              </Link>
            </div>
          <Route path="/info" component={DashBoard} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path='/users' component={UserComponent} />
          <Route exact path="/" render={() => {
            return <div>
              <Link to="/signup" id="signupBTN" class="waves-effect waves-light btn">
                New USer
                 </Link>
              <Link to="/login" id="signinBTN" class="waves-effect waves-light btn">
                SIgn In
             </Link>
            </div>
          }} />
        </Router></PersistGate>
    </Provider>
  }
}



// npx create-react-app my-app
// cd my-app
// npm start





































