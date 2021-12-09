const todoController = require("../controllers/todo");
const tokenMiddleware = require("../middlewares/token.middleware");
const router = require("express").Router();

router.get("/", tokenMiddleware, todoController.getAll);
router.get("/:id", tokenMiddleware, todoController.getOne);
router.post("/", tokenMiddleware, todoController.create);
router.put("/:id", tokenMiddleware, todoController.update);
router.delete("/:id", tokenMiddleware, todoController.delete);

module.exports = router;
