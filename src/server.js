require("dotenv/config")
require("express-async-errors");
const AppError = require("./utils/AppError")
const express = require("express")
const routes = require("./routes")
const migrationsRun = require("./database/sqlite/migrations")
const uploadConfig = require("./config/uploads")
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use("/files",express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes)
migrationsRun()

app.use((error,req,res,next) => {
    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            status:"deu ruim vey",
            message:error.message
        })
    }
    return res.status(500).json({
        status:"deu muitto ruim corre",
        message: error.message
    })
})
const PORT = process.env.SERVER_PORT || 3333
app.listen(PORT, () => {
    console.log(`cachorro andando na quadra ${PORT}`)
})

