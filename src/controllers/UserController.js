const {hash} = require("bcryptjs")
const knex = require("../database/knex");
const sqliteConnection = require("../database/sqlite")
const AppError = require("../utils/AppError")
class UserController{
    async create(req,res){
        const {name,email,password} = req.body
        
        const database = await sqliteConnection()

        const verify = await database.get("SELECT * FROM users WHERE email = (?)",[email])
        if(verify){
            throw new AppError("Email de Usuario Já Cadastrado")
        }
        const hashPassword = await hash(password,8)
        await database.run(
            "INSERT INTO users (name,email,password) VALUES (?,?,?)",
            [name,email,hashPassword]
        )

        return res.status(201).json()
    }
    async index(req,res){
        const { id } = req.params

        const [user] = await knex("users").where({id})
        
        if(user === undefined ){
            throw new AppError("usuario não existe meu parcero")
        }
        
        const notes = await knex("moviesnotes").where({id_user:id})
        
        res.json({
            id,
            name:user.name,
            email:user.email,
            notesMovies:[
                ...notes
            ]
        })
    }
   
}


module.exports = UserController