import React from 'react';
import myFunction from './store/store';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

let store = myFunction().store
export class DashBoard extends React.Component {
  state = {
    editing: false
  }



  withdraw = () => {
    let newTransaction = {
      type: "Cash",
      User: this.props.data.loggedInUser.name+"'s",
      nature: "Withdraw",
      transactionAmount: this.refs.withdrawamount.value,
      Id: Math.floor((Math.random() * 1000000) + 1),
      date: new Date().toLocaleDateString(),
      remainingBalance: this.props.data.loggedInUser.amount + -this.refs.withdrawamount.value,
    }

    store.dispatch({
      type: 'Withdraw',
      payload: newTransaction,
    })

  }


  deposit = () => {

    let newTransaction = {
      type: "Cash",
      User: this.props.data.loggedInUser.name+"'s",
      nature: "Deposit",
      transactionAmount: this.refs.withdrawamount.value,
      Id: Math.floor((Math.random() * 1000000) + 1),
      date: new Date().toLocaleDateString(),
      remainingBalance: this.props.data.loggedInUser.amount - -this.refs.withdrawamount.value,

    }


    store.dispatch({
      type: 'Deposit',
      payload: newTransaction,

    })

  }


  render = () => {

    return <div id="detail">
      <div>
        <nav>
          <div class="nav-wrapper">
            <a id='welcomed' class="brand-logo"> Welcome {this.props.data.loggedInUser.name}</a>
            <a class="brand-logo">THE ISLAMIC BANK</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <Link to='/'><li><a id="logOut"><i>Log Out</i></a></li></Link>

              {/* <li><a id="editProfile"><i>Edit Profile</i></a></li> */}

            </ul>
          </div>
        </nav>
      </div>
      <div id='details'>
        <table width="100%">
          <tr>
            <td colspan="3">
              <h1>
                <pre >E-Banking </pre>
              </h1>
            </td>
          </tr>
          <tr>
            <td>NAME</td>
            <td id="accountName">{this.props.data.loggedInUser.name}</td>
          </tr>
          <tr>
            <td>Balance</td>
            <td id="accountBalance" ref="accountBalance" >{this.props.data.loggedInUser.amount}</td>
          </tr>
          <tr>
            <td><input id="withdrawamount" type="text" ref="withdrawamount" /></td>
            {/* <!-- WITHDRAW Button --> */}
            <td>
              <a onClick={this.withdraw} id="withdrawBTN" class="waves-effect waves-light btn">WITHDRAW</a>
            </td>
            {/* <!-- Deposit Button --> */}
            <td>
              <a onClick={this.deposit} id="depositBTN" class="waves-effect waves-light btn">DEPOSIT</a>
            </td>
            <td>
              {/* <!-- Drop Down List --> */}
              <div class="btn-group">
                <button type="button" class="btn btn-danger" id="transferAmmount">Transfer</button>
                <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span class="sr-only">Toggle Dropdown</span>
                </button>
                <div class="dropdown-menu" id="drop">

                </div>
              </div>
            </td>
            <td>
              <div>
                <h3 id="rN"></h3>
              </div>
            </td>
          </tr>

        </table>




        <table id="dashBoard" ref='dashBoard' class="centered">
          <thead>
            <tr>
              <th> <select name="" id="transactionFilter">
                <option value="All">All</option>
                <option value="Deposit">Deposit</option>
                <option value="Withdraw">Withdraw</option>
              </select></th>
            </tr>

            <tr>
              <th>DATE</th>
              <th>User</th>
              <th>NATURE</th>
              <th>TRANSACTION ID</th>
              <th>AMOUNT</th>
              <th>Delete</th>
              <th>Edit?</th>

            </tr>
            {
              this.props.data.loggedInUser.transactions.map((transaction, index) => {
                return <tr style={{ backgroundColor: transaction.nature == "Deposit" ? "grey" : 'darkgrey' }}>
                  <td>{transaction.date}</td>
                  <td>{transaction.User}</td>
                  <td>{transaction.nature}</td>
                  <td>{transaction.Id}</td>
                  {/* <td>{transaction.transactionAmount}</td> */}
                  <td> {this.state.editing ? <input onChange={(evt) => {
                    this.setState({
                      editedValue: evt.target.value
                    })
                  }} defaultValue={transaction.transactionAmount} /> : transaction.transactionAmount}</td>
                  <td><button onClick={() => {
                    this.props.send({
                      type: 'DELETE_TRANSACTION',
                      target: index,
                      ctx:this,
                    })
                  }}> Delete</button></td>
                  <td>
                    {!this.state.editing && <button onClick={() => {
                      this.setState({
                        editing: true
                      });
                    }}>EDIT</button>
                    }
                    {this.state.editing && <button onClick={() => {

                      this.props.send({
                        type: 'TRANSACTION_UPDATED',
                        payload: {
                          index: index,
                          updatedAmount: this.state.editedValue
                        }

                      })

                      this.setState({
                        editing: false
                      });

                    }}>Done</button>
                    }
                  </td>




                </tr>

              })

            }
          </thead>

          <tbody id="transactionsTable">

          </tbody>
        </table>
      </div>

    </div>


  }
}
export default connect((store) => {

  return {
    data: store.SignupReducer
  }

}, function (dispatch) {
  return {
    send: dispatch
  }
})(DashBoard)
