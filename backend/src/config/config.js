require("dotenv").config();

const config = Object.freeze({
    MONGODB_URI : process.env.MONGODB_URI,
    JWT_SECRET : process.env.JWT_SECRET
})

module.exports = config