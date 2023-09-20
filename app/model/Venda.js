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
    valorTotal: Number,
    descontoNoValorTotal: Number,
    criadoEm: Date,
    alteradoEm: Date
});


module.exports = Venda;