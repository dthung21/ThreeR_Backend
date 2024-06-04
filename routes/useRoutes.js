const { register, login,productlist, creatorlist } = require("../controllers/usecontrollers")

const router = require("express").Router()

router.post("/register",register)
router.post("/login",login)
router.post("/productlist",productlist)
router.post("/creatorlist",creatorlist)
module.exports = router