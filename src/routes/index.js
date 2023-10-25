const {Router} = require("express")
const routes = Router()

const userRoutes = require("./user.routes.js")
const notesMoviesRoutes = require("./notesMovies.routes.js")
const tagsRoutes = require("./tags.routes.js")


routes.use("/users", userRoutes)
routes.use("/moviesnotes",notesMoviesRoutes)
routes.use("/tags", tagsRoutes)


module.exports = routes