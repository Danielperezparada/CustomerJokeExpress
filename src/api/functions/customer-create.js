
const completeBody = args => new Promise((resolve) => {
  const {
    body,
    uuidv4,
  } = args;

  if (body && !body.id) {
    body.id = uuidv4();
  }

  return resolve(args);
});

const validateCustomerBody = args => new Promise((resolve, reject) => {
  const {
    body,
    customerValidationSchema,
    jsonValidator,
  } = args;

  const valid = jsonValidator.validate(customerValidationSchema, body);
  if (!valid) {
    const err = {
      error: 'Bad Request',
      error_description: `Error validating body at 'validateCustomerBody' due: ${jsonValidator.errorsText()}`,
      statusCode: 400,
    };
    return reject(err);
  }

  return resolve(args);
});

const insertCustomer = args => new Promise((resolve, reject) => {
  const {
    body,
    knex,
  } = args;

  knex('customers')
    .insert(body)
    .then(() => resolve(body))
    .catch((error) => {
      const err = {
        error: 'Internal Server Error',
        error_description: error,
        statusCode: 500,
      };
      return reject(err);
    });
});

const customerCreation = ({
  body,
  customerValidationSchema,
  jsonValidator,
  knex,
  uuidv4,
}) => new Promise((resolve, reject) => {

  const args = {
    body,
    customerValidationSchema,
    jsonValidator,
    knex,
    uuidv4,
  };

  completeBody(args)
    .then(validateCustomerBody)
    .then(insertCustomer)
    .then(resolve)
    .catch(reject);

});


exports.customerCreation = customerCreation;
