const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    vehicalno: String,
    licenseno: String,
    password: String,
})

module.exports = mongoose.model("riders",riderSchema);