const mongoose = require('mongoose');



const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    free: {
        type:Number, // 0 -> not free   1 -> is free
        required: true
    },
    video: {
        type:String, // 0 -> not free   1 -> is free
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "Course"
    },
}, { timestamps : true });


const model = mongoose.model("Session", schema);

module.exports = model;



