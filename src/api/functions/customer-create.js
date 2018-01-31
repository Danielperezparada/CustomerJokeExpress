
const validateCustomerBody = ({
  body,
  customerValidationSchema,
  jsonValidator,
}) => new Promise((resolve, reject) => {
  const valid = jsonValidator.validate(customerValidationSchema, body);
  if (!valid) {
    const err = {
      error: 'Bad Request',
      error_description: `Error validating body at 'validateCustomerBody' due: ${jsonValidator.errorsText()}`,
      statusCode: 400,
    };
    return reject(err);
  }
  return resolve();
});

const insertCustomer = ({
  body,
  knex,
}) => new Promise((resolve, reject) => {
  console.log('here');

  knex('customers')
    .insert(body)
    .then(resolve)
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
}) => new Promise((resolve, reject) => {

  validateCustomerBody({ body, customerValidationSchema, jsonValidator })
    .then(insertCustomer({ body, knex }))
    .then(resolve)
    .catch(reject);

});


exports.customerCreation = customerCreation;
