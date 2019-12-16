const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("user", userSchema);