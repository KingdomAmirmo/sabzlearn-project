const departmentSubModel = require("../../models/department-sub");

exports.create = async(req, res) => {
    const { title, parent } = req.body;
    const departmentSub = await departmentSubModel.create({
        title,
        parent
    });

    return res.status(201).json(departmentSub);
};