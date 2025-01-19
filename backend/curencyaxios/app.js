const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint 1: Fetch exchange rates
app.get('/exchange-rates/:base', async (req, res) => {
    const base = req.params.base.toUpperCase();
    
    
    try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${base}`);
        const { rates } = response.data;
        const filteredRates = {
            EUR: rates.EUR,
            GBP: rates.GBP,
            JPY: rates.JPY
            
            
        };
        
        res.json({ base, rates: filteredRates });
    } catch (error) {
        res.status(400).json({ error: 'Invalid base currency or API error' });
    }
});

// Endpoint 2: Convert currency
app.post('/convert', async (req, res) => {
    const { base, target, amount } = req.body;
    if (!base || !target || !amount || amount < 0) {
        return res.status(400).json({ error: 'Invalid input' });
    }
    
    try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${base.toUpperCase()}`);
        const rate = response.data.rates[target.toUpperCase()];
        if (!rate) {
            return res.status(400).json({ error: 'Invalid target currency' });
        }
        const convertedAmount = amount * rate;
        res.json({ base, target, amount, convertedAmount });
    } catch (error) {
        res.status(500).json({ error: 'API error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});