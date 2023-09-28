const mongoose = require('mongoose');

const Venda = mongoose.model('Venda', {
    cliente: { type: mongoose.Types.ObjectId, ref: 'Cliente' },
    produtos: [
        {
            produto: { type: mongoose.Types.ObjectId, ref: 'Produto' },
            quantidade: Number
        }
    ],
    status: String, //aberto ou finalizada,
    valorTotal: Number, // centavos
    descontoNoValorTotal: Number, // em centavos
    modeloMoto: String,
    criadoEm: Date,
    alteradoEm: Date,
    formaPagamento: String,
    observacao: String
});


module.exports = Venda;