const knex = require("../database/knex");
const AppError = require("../utils/AppError");
class NotesMoviesController {
  async create(req, res) {
    const { title, description, note, id_user,tags } = req.body;

    const user_id = await knex("users").where({id:id_user})
    if(user_id.length == 0){
      throw new AppError("usuario não existe")
    }
    const [moviesid] = await knex("moviesnotes").insert({
      title,
      description,
      note,
      id_user
    })
    
    const tag = tags.map((name) => {
      return {
        id_notemovie:moviesid,
        id_user,
        name
      }
    })
    console.log(tag)

    await knex("moviestags").insert(tag)

    res.json({
      status:"criou vey"
    })
    
  }
}

module.exports = NotesMoviesController;
