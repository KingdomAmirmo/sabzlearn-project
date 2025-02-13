const menuModel = require("../../models/menu");




exports.getAll = async(req, res) => {

    const menus = await menuModel.find({}).lean();
    menus.forEach((menu) => {
        const submenus = [];
        for (let i = 0; i < menus.length; i++) {
            const mainMenu = menus[i];
            //String(mainMenu.parent) === String(menu._id)
            if (mainMenu.parent?.equals(menu._id)) {
                submenus.push(menus.splice(i, 1)[0]);
                i = i - 1;
            }
        }
        menu.submenus = submenus;
    });

    return res.json(menus);

};



exports.create = async(req, res) => {
    const { title, href, parent } = req.body;
    const menu = await menuModel.create({
        title,
        href,
        parent,
    });
    if (!menu) {
        return res.json({ message: "Something went Wrong." })
    }
    return res.status(201).json(menu);

};


exports.getAllInPanel = async(req, res) => {
    const menus = await menuModel.find().populate('parent');
    return res.json(menus);
};

exports.remove = async(req, res) => {
    /// Codes
};