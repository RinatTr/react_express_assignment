const express = require('express');
const router = express.Router();
const { getAllUsers,
        getOneUser,
        editUser,
        addUser } = require('../db/queries/q-users.js')

router.get('/users', getAllUsers )
router.get('/users/:id', getOneUser )
router.patch('/users/:id', editUser )
router.post('/users/', addUser )

module.exports = router
