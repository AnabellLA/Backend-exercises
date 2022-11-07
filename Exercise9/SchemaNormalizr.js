const {normalize, denormalize, schema} = require("normalizr");
const util = require("util")

const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'id' })
const messageSchema = new schema.Entity('messages', {
    author: authorSchema
})
const messagesSchema = {messages: [messageSchema]}
function normalizar(data) {
    return console.log(util.inspect(normalize({id:"mensajes", messages: data}, messagesSchema), false, 4));
}

module.exports = { normalizar };