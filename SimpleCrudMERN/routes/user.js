const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();
 



router.post("/add", userController.addUser);
router.get("/", userController.showUsers);
router.delete("/delete/:id", userController.deleteUser);
router.put("/update/:id", userController.updateUser);



module.exports = router;