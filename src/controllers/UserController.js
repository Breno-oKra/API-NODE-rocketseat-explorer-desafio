const { hash,compare } = require("bcryptjs");
const knex = require("../database/knex");
const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");
const UserRepository = require("../repositories/UserReposiroy")
const UserCreateService = require("../services/UserCreateService")
class UserController {
  async create(req, res) {
    const { name, email, password } = req.body;
    const userRepository = new UserRepository()
    const userCreateService = new UserCreateService(userRepository)

    await userCreateService.execute( { name, email, password })
    return res.status(201).json();
  }
  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;
    
    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [
      user_id,
    ]);
    
    if (!user) {
      throw new AppError("Usuario não encontrado");
    }
    const userWithUpdateEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError("este e-mail ja está em uso");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("Informe a senha antiga para definir uma nova");
    }
    if (password && old_password) {
        
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere");
      }
      user.password = await hash(password, 8);
    }
    await database.run(
      `
        UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        updated_at = DATETIME('now')
        WHERE id = ?
      `,
      [user.name, user.email, user.password, user_id]
    );

    return response.status(200).json({
      ...user,
    });
  }
  async index(req, res) {
    const { id } = req.params;

    const [user] = await knex("users").where({ id });

    if (user === undefined) {
      throw new AppError("usuario não existe meu parcero");
    }

    const notes = await knex("moviesnotes").where({ id_user: id });

    res.json({
      id,
      name: user.name,
      email: user.email,
      notesMovies: [...notes],
    });
  }
}

module.exports = UserController;
