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
const { customerFindAll } = require('../functions/customer-findAll');
const { customerFindById } = require('../functions/customer-findAll');
const { customerUpdateById } = require('../functions/customer-findAll');
const { customerDelete } = require('../functions/customer-findAll');

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
    res.status(err.statusCode).json(err);
  });
};

const customerGetAll = (req, res) => {
  customerFindAll({
    customerValidationSchema: customerValidationModel,
    jsonValidator: _jsonValidator,
    knex,
  }).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

const customerGetById = (req, res) => {
  customerFindById({
    customerValidationSchema: customerValidationModel,
    jsonValidator: _jsonValidator,
    knex,
  }).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

const customerPatchById = (req, res) => {
  customerUpdateById({
    customerValidationSchema: customerValidationModel,
    jsonValidator: _jsonValidator,
    knex,
  }).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

const customerDelById = (req, res) => {
  customerDelete({
    customerValidationSchema: customerValidationModel,
    jsonValidator: _jsonValidator,
    knex,
  }).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

module.exports = {
  customerPost,
  customerGetAll,
};
