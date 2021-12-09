const router = require("express").Router();
const userController = require("../controllers/users");

router.post("/signup", userController.signup);
router.get("/",(req,res)=>{res.send("you are in users route")});

module.exports = router;