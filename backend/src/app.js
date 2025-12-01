const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes")
const morgan = require("morgan")


const app = express();
app.use(express.json())
app.use(cookieParser())

//for logging
app.use(morgan("dev"))


//auth-routes
app.use('/api/auth',authRoutes)


module.exports = app