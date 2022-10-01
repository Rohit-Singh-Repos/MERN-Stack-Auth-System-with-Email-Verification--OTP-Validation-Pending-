// Importing Packages

const express = require("express");
const cors = require("cors");

// Importing Local Modules or, Files
const swaggerInit = require("./config/swaggerconfig");
const router = require("./routes");
const config = require("./config/config");
const connectToDB = require("./config/connection");

// Initializing Variables
const app = express()
const PORT = config.port;

// Resolving CORS Issue
app.use(cors({origin:true}))

// Connect to Database
connectToDB()

// parse incoming requests of content-type - application/json
app.use(express.json())

// Initializing API Routes
app.use("/api/user",router)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
  swaggerInit(app)
})