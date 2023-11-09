const {Router} = require("express")
const useRoutes = Router()
const ensureAuth = require("../middleware/ensureAuth")
const TagsController = require("../controllers/TagsController")
const tagsController = new TagsController

useRoutes.get("/", ensureAuth,tagsController.index)
  


module.exports = useRoutes