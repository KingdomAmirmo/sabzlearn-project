const express = require('express');

const commentsController = require("../../controllers/v1/comment");
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");

const router = express.Router();

router.route('/')
    .post(authMiddleware, commentsController.create)
    .get(authMiddleware, isAdminMiddleware, commentsController.getAll);

router.route('/:id')
    .delete(authMiddleware,isAdminMiddleware, commentsController.remove);

router.route('/:id/accept')
    .put(authMiddleware, isAdminMiddleware, commentsController.accept);
router.route('/:id/reject')
    .put(authMiddleware, isAdminMiddleware, commentsController.reject);
router.route('/:id/answer')
    .post(authMiddleware, isAdminMiddleware, commentsController.answer);

module.exports = router;
