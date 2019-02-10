//show one user
// edit user
import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false,
      userObj: {}
    }
  }

  componentDidMount = () => {
    this.findUser()
  }

  findUser = () => {
    let { users, match } = this.props;
    let userObj = users.find(user => user.id === +match.params.id)
    this.setState({
      userObj: userObj
    })
  }

  handleClick = (e) => {
    let boolean = this.state.clicked ? false : true
    this.setState({
      clicked: boolean
    })
  }


  render() {
    let { userObj, clicked } = this.state;
    let { handleSubmit, handleChange, userName, userEmail, userPassword, phoneNumber, isDuplicate } = this.props;

    return (

      <React.Fragment>
        <h3>User Information</h3>
        <ul>
        <li>Username: {userObj.username}</li>
        <li>Email: {userObj.email}</li>
        <li>Password: {userObj.password}</li>
        <li>Phone: {userObj.phone}</li>
        </ul>
        <button onClick={this.handleClick}>{!clicked ? "Edit user" : "Cancel"}</button>
        { clicked ?
        <div className="add-new">
          <h3>Edit user:</h3>
          <form name="edit" onSubmit={handleSubmit}>
            <input
              id={this.props.match.params.id}
              type="text"
              name="userName"
              value={userName}
              onChange={handleChange}
              placeholder="Enter new username"
            />
            <input
              type="text"
              name="userEmail"
              value={userEmail}
              onChange={handleChange}
              placeholder="Enter new email"
            />
            <input
              type="text"
              name="userPassword"
              value={userPassword}
              onChange={handleChange}
              placeholder="Enter new password"
            />
            <input
              type="text"
              name="phone_number"
              value={phoneNumber}
              onChange={handleChange}
              placeholder="Enter new phone number"
            />
            { isDuplicate ? "Error: either user name or phone already exist" : ""}
            <button type="submit">Submit</button>
           </form>
         </div>
        : ""}
      </React.Fragment>
    )
  }
}

export default User;

// <li key={user.id}>{user.username}, {user.password}, {user.email}</li>
// edit: patch request. path needs to be axios.patch.
//add phonenumber (replace with pass)
