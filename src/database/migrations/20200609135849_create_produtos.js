exports.up = function(knex) {
   return knex.schema.createTable('produtos', function (table) {
        table.increments();
        
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('cliente_id').notNullable();

        table.foreign('cliente_id').references('id').inTable('clientes');
      });
};

exports.down = function(knex) {
   return knex.schema.dropTable('produtos');
};