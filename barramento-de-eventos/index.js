const express = require('express');
const axios = require('axios');     // import

const app = express();
app.use(express.json());

app.post('/eventos', (req, res) => {
    const evento = req.body;
    console.log(evento);
    // Envia o evento para o microsserviço de lembretes
    axios.post('https://localhost:4000/eventos', evento);
    // Envia o evento para o microsserviço de observações
    axios.post('http://localhost:5000/eventos', evento);
    // Envia o evento para o microsserviço de consulta
    axios.post('http://localhost:6000/eventos', evento);
    // Envia o evento para o microsserviço de classificação
    axios.post('http://localhost:7000/eventos', evento);
    res.status(200).send({ msg: 'ok' });
});

app.listen(10000, () => console.log('Microsserviço Eventu Bus. Porta 10000.'));