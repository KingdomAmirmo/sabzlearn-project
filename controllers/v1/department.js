const departmentModel = require("../../models/department");

exports.create = async (req, res) => {
    const { title } = req.body;
    const department = await departmentModel.create({
        title
    });

    return res.status(201).json(department);
};