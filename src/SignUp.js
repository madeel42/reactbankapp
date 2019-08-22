
import React from 'react';
import myFunction from './store/store';
let store = myFunction().store

export default class Signup extends React.Component {
  selectFile = (evt) => {
    this.setState({
      selectedFile: evt.target.files[0]
    })


  }


  handleChange = (evt) => {

    this.setState({
      [evt.target.name]: evt.target.value
    });

  }
  signup = (evt) => {
    this.state.transactions = [];

    evt.preventDefault();

    console.log(this.state);

    store.dispatch({
      ctx: this,
      type: "CREATING_USER",
      data: this.state
    });

  }
  render = () => {
    return <div id="signup-comp">
      <form onSubmit={this.signup}>

        <h2>SIGN UP</h2>

        <div>
          <input onChange={this.handleChange} type="text" name="name" placeholder="Name " />
        </div>

        <div>
          <input onChange={this.handleChange} type="text" name="email" placeholder="Email " />
        </div>

        <div>
          <input onChange={this.handleChange} type="number" name="amount" placeholder="Initial AMount " />
        </div>

        <div>
          <input onChange={this.handleChange} type="date" name="dob" placeholder="Date of birth " />
        </div>

        <div>
          <input onChange={this.handleChange} type="password" name="password" placeholder="Password" />
        </div>

        <p>
          <label>
            <input onChange={this.handleChange} name="gender" value="MALE" type="radio" />
            <span>Male</span>
          </label>
        </p>
        <p>
          <label>
            <input onChange={this.handleChange} name="gender" value="FEMALE" type="radio" />
            <span>Female</span>
          </label>
          <img id="filePreview" />
        </p>
        <div>
          <input onChange={this.selectFile} type="file" name="userdp" />
          <div>
            <button type="submit">Submit</button>
          </div>

        </div>


      </form>

    </div>
  }
}