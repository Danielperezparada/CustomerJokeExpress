

const findAllCustomers = args => new Promise((resolve, reject) => {
  const {
    knex,
  } = args;

  knex('customers')
    .select()
    .then((res) => {
      console.log(res);
      args.allCustomers = res;
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
    allCustomers,
    customerValidationSchema,
    jsonValidator,
  } = args;

  const valid = jsonValidator.validate(customerValidationSchema, allCustomers);
  if (!valid) {
    const err = {
      error: 'Internal Server Error',
      error_description: `Error validating response at 'validateCustomerResponse' due: ${jsonValidator.errorsText()}`,
      statusCode: 500,
    };
    return reject(err);
  }

  return resolve(args);
});

const customerDelete = ({
  customerValidationSchema,
  jsonValidator,
  knex,
}) => new Promise((resolve, reject) => {

  const args = {
    customerValidationSchema,
    jsonValidator,
    knex,
  };

  findAllCustomers(args)
    .then(validateCustomerResponse)
    .then(resolve)
    .catch(reject);

});


exports.customerDelete = customerDelete;
