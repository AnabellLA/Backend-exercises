const optionsSQL = {
client : "sqlite3",
connection: {
    filename: "./DB/myDB.sqlite"
},
useNullAsDefault: true
};

module.exports = { optionsSQL };