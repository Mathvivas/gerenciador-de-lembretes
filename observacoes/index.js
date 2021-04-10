const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const funcoes = {
    ObservacaoClassificada: (observacao) => {
        const observacoes = observacoesPorLembreteId[observacao.lembreteId]
        const obsParaAtualizar = observacoes.find((o) => o.id === observacao.id)
        obsParaAtualizar.status = observacao.status
        axios.post('http://192.168.15.14:10000/eventos', {
            tipo: "ObservacaoAtualizada",
            dados: {
                id: observacao.id,
                texto: observacao.texto,
                lembreteId: observacao.lembreteId,
                status: observacao.status
            }
        })
    }
}

const observacoesPorLembreteId = {};

// localhost:5000/lembretes/123/observacoes
app.put('/lembretes/:id/observacoes', async (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;
    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || [];
    observacoesDoLembrete.push({ id: idObs, texto, status: 'Aguardando' });    // texto = texto: texto
    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;
    await axios.post("http://192.168.15.14:10000/eventos", {
    tipo: "ObservacaoCriada",
    dados: {
      id: idObs,
      texto,
      lembreteId: req.params.id,
      status: "Aguardando"
    }
  });
  res.status(201).send(observacoesDoLembrete);
});

app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || []);
});

app.post('/eventos', (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados)
    } catch(err) {}
    res.status(200).send({ msg: 'ok' });
});

app.listen(5000, () => console.log("Microsserviço de Observações. Porta 5000"));