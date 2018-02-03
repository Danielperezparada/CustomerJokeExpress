

const validateInputParameters = args => new Promise((resolve, reject) => {
  const {
    id,
    jsonValidator,
  } = args;

  const validId = jsonValidator.validate({ type: 'string', format: 'uuid' }, id);

  if (!validId) {
    const err = {
      error: 'Internal Server Error',
      error_description: `Error validating response at 'validateInputParameters' due: ${jsonValidator.errorsText()}`,
      statusCode: 500,
    };
    return reject(err);
  }

  return resolve(args);

});

const deleteCustomerById = args => new Promise((resolve, reject) => {
  const {
    id,
    knex,
  } = args;

  knex('customers')
    .where('id', id)
    .del()
    .then(() => resolve())
    .catch((error) => {
      const err = {
        error: 'Internal Server Error',
        error_description: error,
        statusCode: 500,
      };
      return reject(err);
    });
});

const customerDeleteById = ({
  id,
  jsonValidator,
  knex,
}) => new Promise((resolve, reject) => {

  const args = {
    id,
    jsonValidator,
    knex,
  };

  validateInputParameters(args)
    .then(deleteCustomerById)
    .then(resolve)
    .catch(reject);

});


exports.customerDeleteById = customerDeleteById;
