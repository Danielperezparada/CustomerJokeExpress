

const validateInputParameters = args => new Promise((resolve, reject) => {
  const {
    id,
    body,
    customerValidationSchema,
    jsonValidator,
  } = args;

  const validId = jsonValidator.validate({ type: 'string', format: 'uuid' }, id);
  const validBody = jsonValidator.validate(customerValidationSchema, body);

  if (!validId || !validBody) {
    const err = {
      error: 'Internal Server Error',
      error_description: `Error validating response at 'validateInputParameters' due: ${jsonValidator.errorsText()}`,
      statusCode: 500,
    };
    return reject(err);
  }

  return resolve(args);

});

const updateCustomerById = args => new Promise((resolve, reject) => {
  const {
    id,
    body,
    knex,
  } = args;

  knex('customers')
    .where('id', id)
    .update(body)
    .then(() => {
      body.id = id;
      return resolve(body);
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

const customerUpdateById = ({
  id,
  body,
  customerValidationSchema,
  jsonValidator,
  knex,
}) => new Promise((resolve, reject) => {

  const args = {
    id,
    body,
    customerValidationSchema,
    jsonValidator,
    knex,
  };

  validateInputParameters(args)
    .then(updateCustomerById)
    .then(resolve)
    .catch(reject);

});


exports.customerUpdateById = customerUpdateById;
