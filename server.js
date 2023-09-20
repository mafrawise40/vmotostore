const express = require('express');
const app = express();
const mongoose = require('mongoose');
const clienteRoutes = require('./app/routes/ClienteRoute');
const produtoRoutes = require('./app/routes/ProdutoRoute');
const vendaRoutes = require('./app/routes/VendaRoute');


const DB_USER = 'rodrigojmsleite'
const DB_PASSWORD = encodeURIComponent('9fX25aNisrBbryaq');

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@vmotorcluster.jn3fmtj.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`
).then(console.log("conectect MONGO DB"))
    .catch();


app.use(express.json()) 

//routes
app.get('/', (req, res) => {
    res.send('HOME!');
});

app.use('/cliente' , clienteRoutes);
app.use('/produto' , produtoRoutes);
app.use('/venda' , vendaRoutes);



app.listen(3000, function () {
    console.log('Server running on port 3000');
});







