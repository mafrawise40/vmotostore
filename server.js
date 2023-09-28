const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose');
const clienteRoutes = require('./app/routes/ClienteRoute');
const produtoRoutes = require('./app/routes/ProdutoRoute');
const vendaRoutes = require('./app/routes/VendaRoute');


const DB_USER = 'rodrigojmsleite'
const DB_PASSWORD = encodeURIComponent('9fX25aNisrBbryaq');

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@vmotorcluster.jn3fmtj.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`
).then(console.log("conected MONGO DB"))
    .catch((erro) => console.log("Not conected MONGO DB" + erro));


app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//routes
app.get('/', (req, res) => {
    res.send('HOME!');
});

app.use('/cliente', clienteRoutes);
app.use('/produto', produtoRoutes);
app.use('/venda', vendaRoutes);



app.listen(3000, function () {
    console.log('Server running on port 3000');
});







