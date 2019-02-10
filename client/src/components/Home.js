import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ users,
                userName,
                userEmail,
                userPassword,
                phoneNumber,
                search,
                handleSubmit,
                handleChange,
                handleSearch,
                isDuplicate }) => {

  let myUsers = users.map(user => {
      return <Link to={"/user/"+user.id} key={user.id}>
                <li key={user.id}>{user.username}</li>
              </Link>
    })

 return (
    <div className="home">
     <div className="data">
       <h3>All users:</h3>
       {myUsers}
     </div>
     <div className="add-new">
     <h5>Add new user:</h5>
     <form name="add" onSubmit={handleSubmit}>
       <input
         type="text"
         name="userName"
         value={userName}
         onChange={handleChange}
         placeholder="Enter username"
       />
       <input
         type="text"
         name="userEmail"
         value={userEmail}
         onChange={handleChange}
         placeholder="Enter email"
       />
       <input
         type="text"
         name="userPassword"
         value={userPassword}
         onChange={handleChange}
         placeholder="Enter password"
       />
       <input
         type="text"
         name="phone_number"
         value={phoneNumber}
         onChange={handleChange}
         placeholder="Enter phone number"
       />
       <button type="submit">add user</button>
       { isDuplicate ? "Error: either user name or phone already exist" : ""}
      </form>
      <h5>Search user:</h5>
      <form name="search" onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleChange}
          placeholder="Enter username"
        />
        <button type="submit">search</button>
      </form>
      </div>
    </div>
 )
}

export default Home;
