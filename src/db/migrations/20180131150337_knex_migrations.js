

exports.up = (knex, Promise) => Promise.all([
  // InAcademia response
  knex.schema.withSchema('public').createTableIfNotExists('customers', (table) => {
    table.string('id').primary();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('dob').notNullable();
    table.timestamp('created_at').defaultTo(knex.raw('now()')).notNullable();
    table.timestamp('updated_at').defaultTo(knex.raw('now()')).notNullable();
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.withSchema('public').dropTable('customers'),
]);
