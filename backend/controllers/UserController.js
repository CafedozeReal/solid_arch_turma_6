const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = class UserController {
    static async register(req, res) {
        res.json('Olá Get Pet')

        const { name, email, phone, password, confirmpassword } = req.body

        if (!name)
        {
            res.status(422).json({ message: 'O nome é obrigatório'})
            return
        }
        if (!email)
        {
            res.status(422).json({ message: 'O email é obrigatório'})
            return
        }
        if (!phone)
        {
            res.status(422).json({ message: 'O telefone é obrigatório'})
            return
        }
        if (!password)
        {
            res.status(422).json({ message: 'A senha é obrigatória'})
            return
        }
        if (!confirmpassword)
        {
            res.status(422).json({ message: 'Você precisa confirmar sua senha'})
            return
        }
        if (password !== confirmpassword)
        {
            res.status(422).json({ message: 'As senhas não coincidem'})
            return
        }

        const userExist = await User.findOneAndDelete({email:email})

        if (userExist)
        {
            res.status(422).json({message: 'Este email já está em uso'})
            return
        }

        const salt = await bcrypt.getSalt(12)
        const passwordhash = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            phone,
            password: passwordhash,
        })

        try
        {
            const newUser = await user.save
            res.status(201).json({message: 'Usuário cadastrado com sucesso', newUser})
        } catch (error) {
            res.status(201).json({message: error})
        }
    }
}