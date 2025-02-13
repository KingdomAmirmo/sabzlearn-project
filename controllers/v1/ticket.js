const departmentModel = require('./../../models/department');
const departmentSubModel = require('./../../models/department-sub');
const ticketModel = require('./../../models/ticket');

exports.create = async(req, res) => {
    const { departmentID, departmentSubID, priority, title, body, course } = req.body;
    const ticket = await ticketModel.create({
        departmentID,
        departmentSubID,
        priority,
        title,
        body,
        course,
        user: req.user._id,
        answer: 0,
        isAnswer: 0,
    });

    const mainTicket = await ticketModel
        .findOne({ _id: ticket._id })
        .populate('departmentID')
        .populate('departmentSubID')
        .populate('user')
        .lean();
    return res.status(201).json(mainTicket);
};

exports.getAll = async(req, res) => {
    const tickets = await ticketModel
        .find({ answer: 0 })
        .populate('departmentID', 'title')
        .populate('departmentSubID', 'title')
        .populate('user', 'name email');
    return res.json(tickets);
};

exports.userTickets = async(req, res) => {
    const tickets = await ticketModel
        .find({ user: req.user._id, })
        .sort({ _id: -1 })
        .populate('departmentID', 'title')
        .populate('departmentSubID', 'title')
        .populate('user', 'name email')
        .lean();
    return res.json(tickets);
};

exports.departments = async(req, res) => {
    const departments = await departmentModel.find();
    return res.json(departments);
};

exports.departmentsSubs = async(req, res) => {
    const departmentSubs = await departmentSubModel.find({
        parent: req.params.id
    }).lean();
    return res.json(departmentSubs);
};

exports.setAnswer = async(req, res) => {
    const { body, ticketID } = req.body;
    const ticket = await ticketModel.findOne({ _id: ticketID }).lean();
    const answerTicket = await ticketModel.create({
        title: "پاسخ تیکت شما",
        body,
        priority: ticket.priority,
        parent: ticketID,
        user: req.user._id,
        departmentID: ticket.departmentID,
        departmentSubID: ticket.departmentSubID,
        answer: 0,
        isAnswer: 1,
    });

    return res.status(201).json(answerTicket)

};

exports.getAnswer = async(req, res) => {
    const { id } = req.params;
    const ticket = await ticketModel.findOne({
        _id: id
    }).lean();
    const answerTicket = await ticketModel.findOne({
        parent: ticket._id
    }).lean();

    return res.json({
        ticket: ticket,
        answerTicket: answerTicket ? answerTicket : null,
    });

};