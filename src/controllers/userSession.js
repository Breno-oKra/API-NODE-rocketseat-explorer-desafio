const knex = require("../database/knex")
const AppError = require("../utils/AppError");
const AuthConfig = require('../config/auth')
const { sign } = require("jsonwebtoken")
const  {compare} = require("bcryptjs")

class SessionController{
    async create(req,res){
        const {email,password} = req.body
        
        //usamos o firt() somente para garantir que ele traga so um
        const user = await knex("users").where({email}).first()
        
        if(!user){
            throw new AppError("Email ou senha incorreta")
        }
        
        const passwordMatched = await compare(password.toString(),user.password)

        if(!passwordMatched){
            throw new AppError("senha incorreta")
        }

        const {secret, expiresIn} = AuthConfig.jwt

        //passamos um objeto vazio, a chave secreta, e o objeto que vai dentro
        const token = sign({}, secret,{
            subject: String(user.id),
            expiresIn
        })

        console.log(user,token)
        return res.json({
            user,token
        })
    }
}


module.exports = SessionController