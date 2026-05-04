const jwt = require('jsonwebtoken')
const User = require('../models/User')

const getUserByToken = async (token) =>
{
    const decoded = jwt.verify(token, 'fatec_turma6_a2026')
    const userId = decoded.id
    const user = await User.finById({_id: userId})

    return user
}

module.exports = getUserByToken