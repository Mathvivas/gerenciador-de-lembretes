const express = require('express');
const app = express();

app.use(express.json());
app.get('/lembretes', (req, res) => {

});

app.post('/eventos', (req, res) => {

});

app.listen(6000, () => console.log("Microsserviço de Consulta. Porta 6000."));