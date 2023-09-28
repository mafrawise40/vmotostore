const Produto = require('../model/Produto');

const router = require('express').Router();

router.post('/', async (req, res) => {

    
    let produto = req.body;
    produto.criadoEm = new Date();
    produto.alteradoEm = new Date();

    if ( produto.nome === '') {
       return res.status(402).json({ erro: 'Nome do produto inválido' }) ;
    }

    try {
        await Produto.create(produto)

        res.status(201).json({ message: 'Produto cadastrado com sucesso!' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: error })
    }
});

router.get('/', async (req, res) => {

    try {
        
        let result = await Produto.find();
        res.status(201).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ erro: error })
    }
});

router.get('/:id', async (req, res) => {
    

    let id = req.params.id;

    try {
        let result =  Produto.findById(id);
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
});


router.delete('/:id', async (req, res) => {


    let id = req.params.id;

    try {
        let result =  Produto.findOneAndRemove({ _id: id });
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
});


router.put('/:id', async (req, res) => {
    let id = req.params.id;

    req.body.alteradoEm = new Date();
    
    try {
        let result =  Produto.findByIdAndUpdate({ _id: id }, req.body, {
            new: true
        });
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
});


module.exports = router;