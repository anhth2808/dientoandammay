const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const InfoSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    }
})

module.exports = mongoose.model("Info", InfoSchema);