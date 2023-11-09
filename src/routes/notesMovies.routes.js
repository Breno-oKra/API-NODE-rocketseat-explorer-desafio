const {Router} = require("express")
const useRoutes = Router()
const ensureAuth = require("../middleware/ensureAuth")
const NotesMoviesController = require("../controllers/NotesMoviesController")
const notesMoviesController = new NotesMoviesController

useRoutes.use(ensureAuth)
useRoutes.get("/", notesMoviesController.index)
useRoutes.get('/:id',notesMoviesController.show)
useRoutes.post('/',notesMoviesController.create)
useRoutes.delete('/:id',notesMoviesController.delete)


module.exports = useRoutes