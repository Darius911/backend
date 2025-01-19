const axios = require('axios');

exports.getExchangeRates = async (req, res) => {
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
};

exports.convertCurrency = async (req, res) => {
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
};