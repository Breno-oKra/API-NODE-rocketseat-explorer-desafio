
exports.up = knex => knex.schema.createTable("moviestags", table => {
    table.increments("id")
    table.integer("id_user").references("id").inTable("users")
    table.integer("id_notemovie").references("id").inTable("moviesnotes").onDelete("CASCADE")
    table.text("name")

})

exports.down = knex => knex.schema.dropTable("moviestags")
