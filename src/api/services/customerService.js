// requires
const Ajv = require('ajv');
const customerValidationModel = require('../models/customer');
const { knex } = require('../../server/server');

// configurations
const _jsonValidator = new Ajv({ useDefaults: true, allErrors: true, format: 'full' });

// Custom Functions
const { customerCreation } = require('../functions/customer-create');

// Function to Get Url
const customerPost = (req, res) => {
  customerCreation({
    body: req.body,
    customerValidationSchema: customerValidationModel,
    jsonValidator: _jsonValidator,
    knex,
  }).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
};

module.exports = {
  customerPost,
};
