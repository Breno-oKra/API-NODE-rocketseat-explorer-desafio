const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");
class UserCreateService{
    constructor(userRepository){
        this.userRepository = userRepository
    }
    async execute({name,email,password}){
        
        const verify = await this.userRepository.findByEmail(email)
        if (verify) {
          throw new AppError("Email de Usuario Já Cadastrado");
        }
        const hashPassword = await hash(password, 8);
    
        const userCreated = await this.userRepository.create({name,email,password:hashPassword})
        return userCreated
    }
}

module.exports = UserCreateService