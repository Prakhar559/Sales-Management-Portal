const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
    dealName: { type: String, required: true },
    valuation: { type: Number, required: true },
    clientReference: { type: String, required: true },
    pipelineStage: { 
        type: String, 
        enum: ['Lead', 'Discovery', 'Negotiation', 'Closed-Won', 'Closed-Lost'],
        default: 'Lead' 
    },
    
    discountRequested: { type: Number, default: 0 },
    isDiscountApproved: { type: Boolean, default: false },
    
    customerFeedback: { type: String, default: "" },
    satisfactionScore: { type: Number, min: 1, max: 5, default: 5 },
    ownerId: { type: String, default: "Sales_Rep_01" }
}, { timestamps: true });

module.exports = mongoose.model('Opportunity', opportunitySchema);