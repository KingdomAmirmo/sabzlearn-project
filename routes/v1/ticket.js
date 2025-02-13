const express = require("express");
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");
const ticketController = require("./../../controllers/v1/ticket");
const departmentController = require("./../../controllers/v1/department");
const departmentSubController = require("./../../controllers/v1/departmentSubController");


const router = express.Router();

router.route('/')
    .post(authMiddleware, ticketController.create)
    .get(authMiddleware, isAdminMiddleware, ticketController.getAll);

router.route('/user')
    .get(authMiddleware, ticketController.userTickets);

router.route('/departments')
    .get(ticketController.departments)
    .post(authMiddleware, isAdminMiddleware, departmentController.create);
router.route('/department-subs/')
    .post(authMiddleware, isAdminMiddleware, departmentSubController.create);

router.route('/departments/:id/subs')
    .get(ticketController.departmentsSubs);

router.route('/answer')
    .post(authMiddleware, ticketController.setAnswer);
router.route('/:id/answer')
    .get(authMiddleware, ticketController.getAnswer);


module.exports = router;