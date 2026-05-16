// server/routes/salesRoutes.js
const express = require('express');
const router = express.Router();
const Opportunity = require('../models/Opportunity');

router.get('/pipeline', async (req, res) => {
    try {
        const data = await Opportunity.find().sort({ createdAt: -1 });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/add-deal', async (req, res) => {
    try {
        const newDeal = new Opportunity(req.body);
        await newDeal.save();
        res.status(201).json(newDeal);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/remove/:id', async (req, res) => {
    try {
        await Opportunity.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deal removed" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;