const offModel = require("../../models/Off");
const courseModel = require("./../../models/course");
const mongoose = require("mongoose");

exports.getAll = async (req, res) => {
    const offs = await offModel.find({}, "-__v")
        .populate('course', 'name href')
        .populate('creator', 'name');
    return res.status(200).json(offs);
};

exports.create = async (req, res) => {
    const { code, course, percent, max } = req.body;
    const newOff = await offModel.create({
        code,
        course,
        max,
        percent,
        uses: 0,
        creator: req.user._id,

    });
    return res.status(201).json(newOff);
};

exports.getOne = async (req, res) => {
    const { code } = req.params;
    const { course } = req.body;

    if (!mongoose.Types.ObjectId.isValid(course)) {
        return res.status(409).json({ message: "Course ID is Not Valid" });
    }

    const off = await offModel.findOne({ course, code, });
    if (!off) {
        return res.status(404).json({ message: "Code is Not Valid" });
    } else if (off.max === off.uses) {
        return res.json({ message: "this code already used" });
    } else {
        await offModel.findOneAndUpdate({
            course,
            code,
        }, {
            uses: off.uses + 1
            }
        );
        return res.json(off);
    }

};


exports.setOnAll = async (req, res) => {
    const { discount } = req.body;
    const coursesDiscount =    await courseModel.updateMany({}, { discount });
    return res.json({ message: "Discounts set successfully."});

};


exports.remove = async (req, res) => {

    const { id } = req.params;
    const deletedOff = await offModel.findOneAndDelete({ _id: id});
    if (!deletedOff) {
        return res.json({
            message: "Off Not Found"
        });
    }
    return res.status(200).json({
        message: "Off deleted successfully"
    });


};

