const Cliente = require('../model/Cliente');

const router = require('express').Router();

router.post('/', async (req, res) => {

    let cliente = req.body;
    cliente.criadoEm = new Date();
    cliente.alteradoEm = new Date();

    try {
        await Cliente.create(cliente);

        res.status(201).json({ message: 'Cliente cadastrado com sucesso!' })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
});

router.get('/', async (req, res) => {

    try {
        let result = await Cliente.find();
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
});

router.get('/:id', async (req, res) => {


    let id = req.params.id;

    try {
        let result =  Cliente.findById(id);
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
});


router.delete('/:id', async (req, res) => {


    let id = req.params.id;

    try {
        let result =  Cliente.findOneAndRemove({ _id: id });
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
});


router.put('/:id', async (req, res) => {
    let id = req.params.id;

    req.body.alteradoEm = new Date();

    try {
        let result = Cliente.findByIdAndUpdate({ _id: id }, req.body, {
            new: true
        });
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
});


module.exports = router;