import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ users,
                userName,
                userEmail,
                userPassword,
                phoneNumber,
                handleSubmit,
                handleChange,
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
     <h3>Add new user:</h3>
     <form name="add" onSubmit={handleSubmit}>
       <input
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
       <button type="submit">add user</button>
       { isDuplicate ? "Error: either user name or phone already exist" : ""}
      </form>
      </div>
    </div>
 )
}

export default Home;
