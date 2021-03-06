const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// localhost:5000/lembretes/123/observacoes
app.put('/lembretes/:id/observacoes', (req, res) => {

});

app.get('/lembretes/:id/observacoes', (req, res) => {

});

app.listen(5000, () => console.log("Microsserviço de Observações. Porta 5000"));