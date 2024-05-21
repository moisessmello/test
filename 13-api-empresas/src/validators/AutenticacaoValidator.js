const yup = require('yup')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

const usuarioSchema = yup.object().shape({
    nome: yup
        .string('campo precisa ser uma texto')
        .required('campo obrigatório'),
    email: yup
        .string('campo precisa ser um texto')
        .email('Email inválido')
        .required('campo obrigatório'),
    senha: yup
        .string('campo precisa ser uma texto')
        .required('campo obrigatório')
})


function usuarioValidador(req, res, next) {
    usuarioSchema
        .validate(req.body, { abortEarly: false })
            .then(() => next())
            .catch(err => {
                const errors = err.inner.map(e => {
                    const erro = {
                        campo: e.path,
                        erros: e.errors
                    }
                    return erro
                })
                res.status(400).json(
                    {
                        mensagem: "Falha na validação dos campos",
                        erros: errors
                    }
                )
            })
}

async 


module.exports = {
    usuarioValidador
}