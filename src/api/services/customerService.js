// requires
const Ajv = require('ajv');
const uuidv4 = require('uuid/v4');

// custom requires
const { knex } = require('../../server/server');
const customerValidationModel = require('../models/customer');
const customerValidationModelUpdated = require('../models/customerUpdated');

// configurations
const _jsonValidator = new Ajv({ useDefaults: true, allErrors: true, format: 'full' });

// Custom Functions
const { customerCreation } = require('../functions/customer-create');
const { customerFindAll } = require('../functions/customer-findAll');
const { customerFindById } = require('../functions/customer-findById');
const { customerUpdateById } = require('../functions/customer-updateById');
const { customerDeleteById } = require('../functions/customer-deleteById');

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
    offset: req.query.offset,
    limit: req.query.limit,
    customerValidationSchema: customerValidationModel,
    jsonValidator: _jsonValidator,
    knex,
  }).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(err.statusCode).json(err);
  });
};

const customerGetById = (req, res) => {
  customerFindById({
    id: req.params.id,
    customerValidationSchema: customerValidationModel,
    jsonValidator: _jsonValidator,
    knex,
  }).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(err.statusCode).json(err);
  });
};

const customerPatchById = (req, res) => {
  customerUpdateById({
    id: req.params.id,
    body: req.body,
    customerValidationSchema: customerValidationModelUpdated,
    jsonValidator: _jsonValidator,
    knex,
  }).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(err.statusCode).json(err);
  });
};

const customerDelById = (req, res) => {
  customerDeleteById({
    id: req.params.id,
    jsonValidator: _jsonValidator,
    knex,
  }).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(err.statusCode).json(err);
  });
};

module.exports = {
  customerPost,
  customerGetAll,
  customerGetById,
  customerPatchById,
  customerDelById,
};
