const {Router} = require("express")
const useRoutes = Router()

const NotesMoviesController = require("../controllers/NotesMoviesController")
const notesMoviesController = new NotesMoviesController

useRoutes.post("/", notesMoviesController.create)
  


module.exports = useRoutes