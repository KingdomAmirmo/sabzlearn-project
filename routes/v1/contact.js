const express = require("express");
const contactController =require("../../controllers/v1/contact");
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");
const router = express.Router();

router.route('/')
    .get(authMiddleware, isAdminMiddleware, contactController.getAll)
    .post(contactController.create);

router.route('/:id')
    .delete(authMiddleware, isAdminMiddleware, contactController.remove);

router.route('/answer')
    .post(authMiddleware, isAdminMiddleware, contactController.answer);

module.exports = router;