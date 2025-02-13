const notificationModel = require("../../models/notification");
const mongoose = require("mongoose");


exports.get = async (req, res) => {
    const { _id } = req.user;
    const adminNotifications = await notificationModel.find({
        admin: _id
    });
    return res.json(adminNotifications);

};


exports.create = async (req, res) => {
    const { message, admin} = req.body;
    const notification = await notificationModel.create({ message, admin });
    return res.status(201).json(notification);
};


exports.seen = async (req, res) => {
    const { id } = req.params;
    const isValidID = mongoose.Types.ObjectId.isValid(id);
    if (!isValidID) {
        return res.status(409).json({
            message: "NotificationID is not valid !!",
        });
    }
    const notification = await notificationModel.findOneAndUpdate(
        {
            _id: id
        }, {
            seen: 1
        }
    );
    return res.json(notification);
};


exports.getAll = async (req, res) => {
    const notifications = await notificationModel.find({});
    return res.json(notifications);
};

