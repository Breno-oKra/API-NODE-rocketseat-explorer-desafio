const knex = require("../database/knex");
const AppError = require("../utils/AppError");
class NotesMoviesController {
  async create(req, res) {
    const { title, description, note, tags } = req.body;
    const id_user = req.user.id;
    const user_id = await knex("users").where({ id: id_user });

    if (user_id.length == 0) {
      throw new AppError("usuario não existe");
    }
    const [moviesid] = await knex("moviesnotes").insert({
      title,
      description,
      note,
      id_user,
    });

    const tag = tags.map((name) => {
      return {
        id_notemovie: moviesid,
        id_user,
        name,
      };
    });

    await knex("moviestags").insert(tag);

    res.json({
      status: "criou vey",
    });
  }
  async show(request, response) {
    const { id } = request.params;

    const note = await knex("moviesnotes").where({ id }).first();
    const tags = await knex("moviestags")
      .where({ id_notemovie: id })
      .orderBy("name");

    return response.json({
      ...note,
      tags,      
    });
  }
  async delete(request, response) {
    const { id } = request.params;
    console.log(id)
    /* await knex("moviesnotes").where({ id }).delete(); */
    await knex("moviesnotes").where({ id }).delete()
    
    return response.json();
  }
  async index(request, response) {
    const { title } = request.query;
    const user_id = request.user.id;
    let notes;
    notes = await knex("moviesnotes")
      .where({ id_user: user_id })

      // quando usamos %title% dizemos ao banco que tanto antes e depois
      // em qualquer parte da palavra que conter title pode retornar
      .whereLike("title", `%${title}%`)
      .orderBy("title");

    const useTags = await knex("moviestags").where({ id_user: user_id });

    const notesWithTags = notes.map((note) => {
      const noteTags = useTags.filter((tag) => tag["id_notemovie"] === note.id);
      return {
        ...note,
        tags: noteTags,
      };
    });

    return response.json(notesWithTags);
  }
}

module.exports = NotesMoviesController;
