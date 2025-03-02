const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    href: {
        type: String,
        required: true,
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "Menu",
        required: false,
    },
}, { timestamps: true });

const model = mongoose.model("Menu", schema);

module.exports = model;