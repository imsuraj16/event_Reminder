const mongoose = require("mongoose");
const config = require("../config/config");


const connectDB = async()=>{
    try {
        await mongoose.connect(config.MONGODB_URI)
        console.log("db connected");
        
    } catch (error) {
        console.log("db connection error",error);
    }
}

module.exports = connectDB
