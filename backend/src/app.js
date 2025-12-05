const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes")
const eventRoutes = require("./routes/event.routes")
const notificationRoutes = require("./routes/notification.routes")
const morgan = require("morgan")
const cors = require("cors");


const app = express();

app.use(cors({
    origin: 'https://event-reminder-rosy.vercel.app','https://whimsical-zabaione-d369c0.netlify.app',
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())

//for logging
app.use(morgan("dev"))


//auth-routes
app.use('/api/auth',authRoutes)

//event-routes
app.use('/api/events',eventRoutes)

//notification-routes
app.use('/api/notifications', notificationRoutes)


module.exports = app
