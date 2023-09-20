const mongoose = require('mongoose');

const Produto = mongoose.model('Produto',{
    nome: String,
    codigo: String,
    fornecedor: String,
    quantidade: Number,
    quantidadeVenda: Number,
    precoCompra: Number ,
    precoVenda: Number ,
    tipo: String, //serviço ou produto
    aplicacao: String,
    criadoEm: Date,
    alteradoEm: Date
});


module.exports = Produto;