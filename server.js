require("express-async-errors");
const AppError = require("./src/utils/AppError")
const express = require("express")
const routes = require("./src/routes")
const migrationsRun = require("./src/database/sqlite/migrations")

const app = express()
app.use(express.json())

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

app.listen(3000, () => {
    console.log("rodando cachorro")
})

