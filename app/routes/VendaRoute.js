const Venda = require('../model/Venda');

const router = require('express').Router();

router.post('/', async (req, res) => {

    let venda = req.body;
    venda.criadoEm = new Date();
    venda.alteradoEm = new Date();

    if ( venda.descontoNoValorTotal ) {
        venda.valorTotal = venda.valorTotal - venda.descontoNoValorTotal;
    }

    try {
        await Venda.create(venda)

        res.status(201).json({ message: 'Venda cadastrado com sucesso!' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: error })
    }
});

router.get('/', async (req, res) => {

    try {
        let result = await Venda.find();
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
});

router.get('/:id', async (req, res) => {


    var id = req.params.id;

    try {
        let result = await Venda.findById(id);
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
});


router.delete('/:id', async (req, res) => {


    var id = req.params.id;

    try {
        let result = await Venda.findOneAndRemove({ _id: id });
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
});


router.put('/:id', async (req, res) => {
    var id = req.params.id;

    req.body.alteradoEm = new Date();
    
    try {
        let result = await Venda.findByIdAndUpdate({ _id: id }, req.body, {
            new: true
        });
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
});


module.exports = router;