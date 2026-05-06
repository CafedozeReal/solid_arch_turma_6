const router = require('express').Router()

const UserController = require('../controllers/UserController')


router.post('/register', UserController.register)

router.patch('/edit/:id',
    verify
)

module.exports = router