const knex = require("../database/knex")
class TagsController{
    async index(request,response){
        
        const user_id = request.user.id
        
        const tags = await knex("moviestags")
        .where({ id_user:user_id })
        //groupBy é usado para agrupar pelo campo e não traz repetidos
        .groupBy("name")

        
        return response.json(tags)
    }
   
}


module.exports = TagsController