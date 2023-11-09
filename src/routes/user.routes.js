const {Router} = require("express")
const multer = require("multer");
const useRoutes = Router()
const ensureAuth = require("../middleware/ensureAuth")
const UserController = require("../controllers/UserController")
const UserAvatarController = require('../controllers/userAvatarController')
const userController = new UserController
const uploadConfig = require("../config/uploads");

const userAvatarController = new UserAvatarController()
const upload = multer(uploadConfig.MULTER);
// get,put,delete
useRoutes.get("/:id", userController.index)
useRoutes.post("/", userController.create)
useRoutes.put("/", ensureAuth, userController.update);
useRoutes.patch("/avatar",ensureAuth,upload.single("avatar"),userAvatarController.update);


module.exports = useRoutes