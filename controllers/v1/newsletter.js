const newsletterModel = require("../../models/newsletter");




exports.getAll = async (req, res) => {
    const newsletters = await newsletterModel.find();
    return res.json(newsletters);
};



exports.create = async (req, res) => {
    const { email } = req.body;
    const newsletter = await newsletterModel.create({ email });
    return res.status(201).json(newsletter);

};


