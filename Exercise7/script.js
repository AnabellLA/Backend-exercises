const {optionsMDB} = require("./mariaDB");
const {optionsSQL} = require("./SQLite3");
const knexMdb = require("knex")(optionsMDB);
const knex = require("knex")(optionsSQL);

knexMdb.schema.dropTableIfExists("productos").then(() => {
        console.log("table deleted MDB");
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        knexMdb.destroy();
    });

knexMdb.schema.createTable("productos", (table) => {
    table.increments("id");
    table.string("title", 50).notNullable();
    table.float("price", 5);
    table.string("thumbnail", 1000).notNullable();
}).then(() => {
    console.log("table created MDB");
}).catch((err) => {
    console.log(err);
}).finally(() => {
    knexMdb.destroy();
});

knex.schema.dropTableIfExists("mensajes").then(() => {
    console.log("table deleted SQLite");
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        knex.destroy();
    });
    
    knex.schema.createTable("mensajes", (table) => {
        table.increments("id");
        table.string("author", 100).notNullable();
        table.datetime("date");
        table.string("text", 1000).notNullable();
    }).then(() => {
        console.log("table created SQLite");
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        knex.destroy();
    });