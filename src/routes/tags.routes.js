const {Router} = require("express")
const useRoutes = Router()

const TagsController = require("../controllers/TagsController")
const tagsController = new TagsController

useRoutes.post("/", tagsController.create)
  


module.exports = useRoutes