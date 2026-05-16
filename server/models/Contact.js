const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: true },
    phone: { type: String },
    lastInteraction: { type: String, default: "Initial Outreach" }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);