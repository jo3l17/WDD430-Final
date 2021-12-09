const router = require("express").Router();
const userController = require("../controllers/user");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/",(req,res)=>{res.send("you are in users route")});

module.exports = router;
