const {verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError")
const authConfig = require("../config/auth")

function ensureAuthenticated(req,res,next){
    const authHeader = req.headers.authorization;
    
    if(!authHeader){
        throw new AppError("JWT token invalido",401)
    }
    //input : "Bare xxxxxxxxxx"
    // o x seria o token kskssk
    const [,token] = authHeader.split(" ")   
    try{
        //recebemos o sub como retorno então pegamos somente ele
        //depois damos um apelido a ele de user_id
        const {sub:user_id} = verify(token,authConfig.jwt.secret);

        req.user = {
            id:Number(user_id)
        }
        
        return next()
    }catch{
        throw new AppError("jwt invalido esquecue",401)
    }
}

module.exports = ensureAuthenticated