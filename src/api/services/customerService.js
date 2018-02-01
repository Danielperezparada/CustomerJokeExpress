// requires
const Ajv = require('ajv');
const uuidv4 = require('uuid/v4');
const customerValidationModel = require('../models/customer');
// const knex = require('../../server/server').knex;
const { knex } = require('../../server/server');

// configurations
const _jsonValidator = new Ajv({ useDefaults: true, allErrors: true, format: 'full' });

// Custom Functions
const { customerCreation } = require('../functions/customer-create');

// Function to insert customers
const customerPost = (req, res) => {
  customerCreation({
    body: req.body,
    customerValidationSchema: customerValidationModel,
    jsonValidator: _jsonValidator,
    knex,
    uuidv4,
  }).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

module.exports = {
  customerPost,
};
