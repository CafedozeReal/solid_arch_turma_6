const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) =>
{
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Acesso negado"
        })
    }

    const token = getToken(req)

    if (!token) {
        return res.status(401).json({
            message: "Acesso negado!"
        })
    }

    try
    {
        const verified = jwt.verify(token, 'fatec_turma6_a2026')
        req.user = verifyed
        next()
    } catch (err) {
        return res.status(400).json({
            message: "Token inválido",
            token: token
        })
    }
}

module.export = checkToken