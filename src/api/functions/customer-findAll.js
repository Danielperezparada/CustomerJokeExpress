
const calcOffsetAndLimit = args => new Promise((resolve) => {
  const {
    offset,
    limit,
  } = args;

  args.offset = (offset && offset >= 0) ? offset : '0';
  args.limit = (limit && limit >= 0) ? limit : '10';

  return resolve(args);
});

const findAllCustomers = args => new Promise((resolve, reject) => {
  const {
    offset,
    limit,
    knex,
  } = args;

  knex('customers')
    .select('id', 'firstName', 'lastName', 'dob')
    .limit(limit)
    .offset(offset)
    .then((res) => {
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
    offset,
    limit,
    allCustomers,
    customerValidationSchema,
    jsonValidator,
  } = args;

  const valid = [];
  allCustomers.forEach((customer) => {
    valid.push(jsonValidator.validate(customerValidationSchema, customer));
  });

  if (valid.includes('true')) {
    const err = {
      error: 'Internal Server Error',
      error_description: `Error validating response at 'validateCustomerResponse' due: ${jsonValidator.errorsText()}`,
      statusCode: 500,
    };
    return reject(err);
  }

  return resolve({ allCustomers, offset, limit });
});

const customerFindAll = ({
  offset,
  limit,
  customerValidationSchema,
  jsonValidator,
  knex,
}) => new Promise((resolve, reject) => {

  const args = {
    offset,
    limit,
    customerValidationSchema,
    jsonValidator,
    knex,
  };

  calcOffsetAndLimit(args)
    .then(findAllCustomers)
    .then(validateCustomerResponse)
    .then(resolve)
    .catch(reject);

});

exports.customerFindAll = customerFindAll;
