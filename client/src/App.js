import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './components/Home'
import User from './components/User'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      userName: "",
      userEmail: "",
      userPassword: "",
      phone_number: "",
      search:"",
      isDuplicate: false
    }
    this.handleSearch = this.handleSearch.bind(this)
  }
  async componentDidMount() {
    await this.getApiData()
  }

  getApiData = () => {
    return axios.get('/users/')
        .then(res => {
          this.setState({
            users: res.data.body
          })
        })
  }

  handleSubmit = (event) => {
    const { userName,
            userEmail,
            userPassword,
            phone_number } = this.state;
    event.preventDefault();
    let id = event.target[0].id
    if (this.isDuplicate(id)) {
      this.setState({
        isDuplicate: true
      })
    } else {
      event.target.name === "edit" ?
      axios.patch(`/users/${id}`, {username: userName, email: userEmail, password: userPassword, phone: phone_number})
          .then( res => {
            this.setState({
              userName: "",
              userEmail: "",
              userPassword: "",
              phone_number: "",
              isDuplicate: false
            })
          })
          :
      axios.post("/users", {username: userName, email: userEmail, password: userPassword, phone: phone_number}) //NEED TO FILL IN ALL THE NOT NULLS
          .then( res => {
            this.setState({
              userName: "",
              userEmail: "",
              userPassword: "",
              phone_number: "",
              isDuplicate: false,
              users: [
                ...this.state.users,
                {
                  id: this.state.users[this.state.users.length-1].id + 1,
                  username: userName,
                  email: userEmail,
                  password: userPassword,
                  phone_number: phone_number
                }
              ]
            })
          })
      }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSearch(event) {
    event.preventDefault()
    await this.getApiData()
    let { users, search } = this.state;
    let usersFound = users.filter(user => (user.username === search))
    this.setState({
      users: usersFound
    })
  }

  isDuplicate = (id) => {
    let { users, userName, phoneNumber } = this.state;
    let duplicateFound = users.find(user => (user.username === userName || user.phone === phoneNumber))
    if (duplicateFound) {
      if (duplicateFound.id === +id) { //to enable editing user
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }

  render() {
    const { users,
            userName,
            userEmail,
            userPassword,
            phone_number,
            search,
            isDuplicate } = this.state;

    return (
      <div className="App">
        <nav>
          <Link to="/"><h1>USERLIST</h1></Link>
        </nav>
        <Switch>
        <Route exact path="/" render={()=> <Home
          users={users}
          userName={userName}
          userEmail={userEmail}
          userPassword={userPassword}
          phoneNumber={phone_number}
          search={search}
          isDuplicate={isDuplicate}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleSearch={this.handleSearch}
         />} />
       <Route path="/user/:id" render={(props)=> <User {...props}
         users={users}
         userName={userName}
         userEmail={userEmail}
         userPassword={userPassword}
         phoneNumber={phone_number}
         isDuplicate={isDuplicate}
         handleChange={this.handleChange}
         handleSubmit={this.handleSubmit}
         /> } />
       </Switch>
      </div>
    );
  }

}

export default App;

// https://github.com/joinpursuit/react_express_example
