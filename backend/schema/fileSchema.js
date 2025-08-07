const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    fileURL: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Document", FileSchema);