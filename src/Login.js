import React from 'react';
import myFunction from './store/store';
let store = myFunction().store

export default class Login extends React.Component {


    handleChange = (evt) => {
  
      this.props.history.push('/login')
  
      this.setState({
        [evt.target.name]: evt.target.value
      });
  
    }
    doLogin = (evt) => {
  
      evt.preventDefault();
  console.log(this.state);
      store.dispatch({
        ctx: this,
        type: "USER_LOGGING_IN",
        data: this.state
      });
  
    }
    render = () => {
      return <div id="signupIn">
        <form onSubmit={this.doLogin}>
  
          <h2>Login Account</h2>
  
          <div>
            <input onChange={this.handleChange} type="text" name="name" placeholder="Name " />
          </div>
  
          <div>
            <input onChange={this.handleChange} type="password" name="password" placeholder="Password " />
          </div>
          <button type="submit">Submit</button>
  
  
        </form >
  
      </div >
    }
  }
  