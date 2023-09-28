const Cliente = require('../model/Cliente');
const Produto = require('../model/Produto');
const Venda = require('../model/Venda');
const { Decimal128 } = require('bson');
const router = require('express').Router();

//create
router.post('/', async (req, res) => {

    let cliente = null;

    let clienteDB = await Cliente.findOne({ telefone: req.body.telefone });
    const hoje = new Date();
    hoje.setHours(hoje.getHours() - 3);

    if (clienteDB != null) {
        cliente = clienteDB;
    } else {

        cliente = await Cliente.create({
            nome: req.body.cliente,
            telefone: req.body.telefone,
            criadoEm: hoje,
            alteradoEm: hoje,
        });
    }

    let novaVenda = new Venda({
        status: 'aberto',
        valorTotal: new Decimal128(req.body.valorTotal), //em centavos
        descontoNoValorTotal: new Decimal128(req.body.desconto), //em centavos
        criadoEm: new Date(),
        alteradoEm: new Date(),
        cliente: cliente,
        produtos: req.body.produtos,
        modeloMoto: req.body.modeloMoto,
        formaPagamento: req.body.formaPagamento,
        observacao: req.body.observacao
    });

    try {
        await Venda.create(novaVenda)

        res.status(201).json({ message: 'Venda cadastrado com sucesso!' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: error })
    }
});


router.get('/', async (req, res) => {

    try {
        let result = await Venda.find().populate('cliente').populate('produtos.produto');

        res.status(201).json(result)
    } catch (error) {

        res.status(500).json({ erro: error })
    }
});


//filtro
router.post('/filtro', async (req, res) => {

    let { dataInicio, dataFim } = req.body;

    if (dataFim !== '') {
        dataFim = new Date(dataFim);
        dataFim.setUTCHours(23, 59, 59, 999);
    } else {
        dataFim = new Date();
        dataFim.setUTCHours(23, 59, 59, 999);
    }

    try {
        let result = await Venda.find({
            criadoEm: {
                $gte: dataInicio,
                $lte: dataFim
            }
        }).populate('cliente').populate('produtos.produto');


        res.status(201).json(result)
    } catch (error) {

        res.status(500).json({ erro: error })
    }
});

router.get('/:id', async (req, res) => {


    let id = req.params.id;

    try {
        let result = await Venda.findById(id).populate('cliente').populate('produtos.produto');
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
});


router.delete('/:id', async (req, res) => {

    let id = req.params.id;

    try {
        let result = Venda.findOneAndRemove({ _id: id });
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
});


//atualizar venda
router.put('/:id', async (req, res) => {
    let id = req.params.id;

    const hoje = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toISOString().slice(0, 10);
    req.body.alteradoEm = hoje;

    let cliente = null;
    let clienteDB = await Cliente.findOne({ telefone: req.body.telefone });

    if (clienteDB != null) {
        cliente = clienteDB;
    } else {
        cliente = await Cliente.create({
            nome: req.body.cliente,
            telefone: req.body.telefone,
            criadoEm: hoje,
            alteradoEm: hoje,
        });
    }

    let vendaAlterada = new Venda({
        _id: id,
        status: req.body.status,
        valorTotal: new Decimal128(req.body.valorTotal), //em centavos
        descontoNoValorTotal: new Decimal128(req.body.desconto), //em centavos
        alteradoEm: req.body.alteradoEm,
        cliente: cliente,
        produtos: req.body.produtos,
        modeloMoto: req.body.modeloMoto,
        formaPagamento: req.body.formaPagamento,
        observacao: req.body.observacao
    });

    try {
        let result = await Venda.findByIdAndUpdate({ _id: id }, vendaAlterada, {
            new: true //retorna o valor atualizado ao invez do anterior
        });

        if (result.status === 'finalizado') {
            for (const p of result.produtos) {
                await Produto.findByIdAndUpdate(p.produto.toHexString(), { $inc: { quantidadeVenda: p.quantidade, quantidade: -p.quantidade } });
            }
        }


        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: error })
    }
});


//cancelar venda
router.post('/:id/cancelar', async (req, res) => {
    let id = req.params.id;
    const hoje = new Date();
    hoje.setHours(hoje.getHours() - 3);


    let vendaAlterada = {
        status: 'cancelado',
        observacao: req.body.observacao + ". Venda Cancelada pelo usuário. " + new Date(),
        alteradoEm: hoje
    };

    try {
        let result = await Venda.findByIdAndUpdate({ _id: id }, vendaAlterada);

        if (result.status === 'finalizado') {//retorna a quantidade dos itens
            for (const p of result.produtos) {
                await Produto.findByIdAndUpdate(p.produto.toHexString(), { $inc: { quantidadeVenda: -p.quantidade, quantidade: p.quantidade } });
            }
        }


        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: error })
    }
});


module.exports = router;