const express = require("express")
const router = express.Router()
const authAppRoutes = require("./app.routes")

router.use(authAppRoutes)
module.exports = router