const express = require('express');
const notificationController = require("../../controllers/v1/notification");
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");


const router = express.Router();


router.route('/')
    .post(authMiddleware, isAdminMiddleware, notificationController.create)
    .get(authMiddleware, isAdminMiddleware, notificationController.getAll);
router.route('/admins')
    .get(authMiddleware, isAdminMiddleware, notificationController.get);

router.route('/:id/see')
    .put(authMiddleware, isAdminMiddleware, notificationController.seen);

module.exports = router;
