
// import history from '../history';


let account = {
  deleteAccount(delIndex, ctx) {
    // /removeaccount/90/FSD
    // /rmeoveaccount/:id/:city
    fetch('/removeaccount/' + delIndex, {
      method: 'DELETE',
    }).then((resp) => {
      return resp.json();
    }).then((resp) => {
      // history.push('/users')
      ctx.setState({
        users: resp.users
      })
    })



  }
  ,
  updateAccount(index, ctx) {

    let headers = {
      "Content-Type": "application/json"
    }
    fetch('/updateAccount/' + index, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(ctx.state.users[index])
    }).then((resp) => {
      return resp.json();
    }).then((resp) => {
      ctx.setState({
        users: resp.users
      })
    })
  },
  // deleteTransactions(dellIndex, ctx) {
  //   fetch('/removeAccount/' + dellIndex, {
  //     method: 'delete',
  //   }).then((resp) => {
  //     return resp.json();
  //   }).then((resp) => {
  //     console.log(resp);
  //     if(resp.success){
  //       alert('delete')
  //     }
  //     // ctx.setState({
  //     //   transaction: resp.transaction
  //     // })
  //   })
  // }
}

export default account;