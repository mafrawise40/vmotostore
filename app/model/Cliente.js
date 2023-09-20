const mongoose = require('mongoose');

const Cliente = mongoose.model('Cliente',{
    nome: String,
    cpf: String,
    email: String,
    telefone: String,
    criadoEm: Date,
    alteradoEm: Date
});


module.exports = Cliente;