// Conexión Knex
export default {
    PORT: process.env.PORT || 8080,
    mongoLocal: {
        client: 'mongodb',
        cxnStr: 'mongodb://localhost27017/'
    },
    mongoRemote: {
        cliente: 'mongodb',
        cxnStr: 'mongodb+srv://anabellbackend:yrithze987@backendcourse.tiddlcu.mongodb.net/?retryWrites=true&w=majority'
    },
    mysql: {
        client: "mysql",
        connection: {
            host: "localhost",
            user: "root",
            password: "",
            database: "coderhouse",
        },
        pool: { min: 0, max: 10 }
    },
    sqlite3: {
        client: "sqlite3",
        connection: {
            filename: "./DB/mydb.sqlite"
        },
        useNullAsDefault: true
    }
}