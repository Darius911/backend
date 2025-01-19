const express = require("express");
const exchangeController = require("../controllers/exchangeController");

const {getExchangeRates, convertCurrency} = exchangeController ;
const exchangeRouter = express.Router();

exchangeRouter.route("/exchange-rates/:base").get(getExchangeRates);
exchangeRouter.route("/convert").post(convertCurrency);

module.exports = exchangeRouter;