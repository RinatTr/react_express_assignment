const { db } = require('./q-index.js')

const getAllUsers = (req, res, next) => {
  db.any('SELECT * FROM users')
    .then( users => {
      res.status(200).json({
        status: 'success',
        message: 'GOT ALL USERS',
        body: users
      })
    }).catch(err => {
      return next(err)
    })
}

const getOneUser = (req, res, next) => {
  let userId = req.params.id
  db.one('SELECT * FROM users WHERE id=$1', [userId])
    .then( user => {
      res.status(200).json({
        status: 'success',
        message: 'GOT ONE USER',
        body: user
      })
    }).catch(err => {
      return next(err)
    })
}

const editUser = (req, res, next) => {
  let queryString = '';
  for (let key in req.body) {
    if (key !== undefined) {
    queryString += key + "=${" + key + "}, "
    }
  }
  queryString = queryString.slice(0,-2);
  db.none('UPDATE users SET '+queryString+' WHERE id='+req.params.id, req.body)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "USER WAS UPDATED"
      })
    })
    .catch(err => next(err));
}

const addUser = (req, res, next) => {
  db.none('INSERT INTO users(username, email, password, phone) VALUES(${username}, ${email}, ${password}, ${phone})', req.body)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "USER WAS CREATED"
      })
    })
}

module.exports = {  getAllUsers,
                    getOneUser,
                    editUser,
                    addUser }
/*
Show all Users: `GET /users`
Show One user: `GET /users/:id`
Edit a user: `PATCH /users/:id`
Add a new user `POST /users`
*/
