const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

/*
    {
        1: [
            {id: a, texto: Entre 14h e 18h},
            {id: b, texto: Outra Obs}
        ],
        2: [
            {id: a, texto: Obs de outro lembrete}
        ]
    }
*/

const observacoesPorLembreteId = {}

// localhost:5000/lembretes/123/observacoes
app.put('/lembretes/:id/observacoes', (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;
    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || [];
    observacoesDoLembrete.push({ id: idObs, texto});    // texto = texto: texto
    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;
    res.status(201).send(observacoesDoLembrete);
});

app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || []);
});

app.listen(5000, () => console.log("Microsserviço de Observações. Porta 5000"));