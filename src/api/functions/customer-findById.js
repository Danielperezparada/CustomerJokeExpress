
const validateInputParameters = args => new Promise((resolve, reject) => {
  const {
    id,
    jsonValidator,
  } = args;

  const valid = jsonValidator.validate({ type: 'string', format: 'uuid' }, id);

  if (!valid) {
    const err = {
      error: 'Internal Server Error',
      error_description: `Error validating response at 'validateInputParameters' due: ${jsonValidator.errorsText()}`,
      statusCode: 500,
    };
    return reject(err);
  }

  return resolve(args);

});

const findCustomersById = args => new Promise((resolve, reject) => {
  const {
    id,
    knex,
  } = args;

  knex('customers')
    .select('id', 'firstName', 'lastName', 'dob')
    .where('id', id)
    .then((res) => {
      const [customerById] = res;
      args.customerById = customerById;
      return resolve(args);
    })
    .catch((error) => {
      const err = {
        error: 'Internal Server Error',
        error_description: error,
        statusCode: 500,
      };
      return reject(err);
    });
});

const validateCustomerResponse = args => new Promise((resolve, reject) => {
  const {
    customerById,
    customerValidationSchema,
    jsonValidator,
  } = args;

  const valid = jsonValidator.validate(customerValidationSchema, customerById);

  if (!valid) {
    const err = {
      error: 'Internal Server Error',
      error_description: `Error validating response at 'validateCustomerResponse' due: ${jsonValidator.errorsText()}`,
      statusCode: 500,
    };
    return reject(err);
  }

  return resolve(customerById);
});

const customerFindById = ({
  id,
  customerValidationSchema,
  jsonValidator,
  knex,
}) => new Promise((resolve, reject) => {

  const args = {
    id,
    customerValidationSchema,
    jsonValidator,
    knex,
  };

  validateInputParameters(args)
    .then(findCustomersById)
    .then(validateCustomerResponse)
    .then(resolve)
    .catch(reject);

});

exports.customerFindById = customerFindById;
