const todoController = require("../controllers/todo");


const router = require("express").Router();

router.get("/", todoController.getAll);
router.get("/:id", todoController.getOne);
router.post("/", todoController.create);
router.put("/:id", todoController.update);
router.delete("/:id", todoController.delete);

module.exports = router;
