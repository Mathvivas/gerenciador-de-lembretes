const express = require('express');
const axios = require('axios');     // import

const app = express();
app.use(express.json());

const eventos = []

app.post('/eventos', (req, res) => {
    const evento = req.body;
    eventos.push(evento)
    // Envia o evento para o microsserviço de lembretes
    axios.post('https://192.168.15.14:4000/eventos', evento);
    // Envia o evento para o microsserviço de observações
    axios.post('http://192.168.15.14:5000/eventos', evento);
    // Envia o evento para o microsserviço de consulta
    axios.post('http://192.168.15.14:6000/eventos', evento);
    // Envia o evento para o microsserviço de classificação
    axios.post('http://192.168.15.14:7000/eventos', evento);
    res.status(200).send({ msg: 'ok' });
});

app.get('/eventos', (req, res) => {
    req.send(eventos)
})

app.listen(10000, () => console.log('Microsserviço Eventu Bus. Porta 10000.'));