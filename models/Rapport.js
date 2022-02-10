const mongoose = require("mongoose");
const RapportSchema = new mongoose.Schema({

    titre: {
        type: String,
        required: false,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: false,
    },
    pdfPath : {
        type: String,
        required: true,
        required: true,
        trim: false,

    },
    filename : {
        type: String,
        required: true,
        trim: true,
    },
    originalname : {
        type: String,
        required: true,
        trim: true,
    },
    size : {
        type: Number,
        required: true,
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Client',
        required: true,
    }
});
const Rapport = mongoose.model("Rapport", RapportSchema);
module.exports = Rapport;