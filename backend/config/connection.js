const mongoose = require("mongoose");
const config = require("./config");

const connectToDB = async() => {
    try {
        const DB_OPTIONS = {
            dbName:config.dbname
        }
        await mongoose.connect(config.mongoUri,DB_OPTIONS,(error) => {   
            if(error){
                console.log("Error while connecting",error)
            }else{
                console.log("Successfully Connected")
            }
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToDB;