const {Router} = require("express")
const useRoutes = Router()

const UserController = require("../controllers/UserController")
const userController = new UserController


// get,put,delete
useRoutes.get("/:id", userController.index)
useRoutes.post("/", userController.create)
  


module.exports = useRoutes