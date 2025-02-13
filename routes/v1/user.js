const express = require("express");
const usersController = require("../../controllers/v1/user");
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");

const router = express.Router();


router.route('/')
    .get(authMiddleware, isAdminMiddleware, usersController.getAll)
    .put(authMiddleware, usersController.updateUser);
router.route('/:id')
    .delete(authMiddleware, isAdminMiddleware, usersController.removeUser);
router.route("/ban/:id")
    .post(authMiddleware, isAdminMiddleware, usersController.banUser);
router.route('/role') //req.body
    .put(authMiddleware, isAdminMiddleware, usersController.changeRole);


module.exports = router;
