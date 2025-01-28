const express = require('express');
const {createTicket} = require('../controlers/ticketControler');
const ticketValidator = require('../validators/ticket');
const validate = require('../validators/validate');







// sukuriame ir pervardiname tourRouter tiesiog į router
const router = express.Router();

// deklaruojame, aprašome tour routes, svarbi routs eilės tvarka
router.route('/').post( ticketValidator,validate, createTicket); 





module.exports = router;
