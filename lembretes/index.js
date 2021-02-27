const express = require ('express');
const app = express();

app.get('/lembretes', (req, res) => {
    res.status(200).send({"Resultado ": "OK"});
});

app.listen(4000, () => {
    console.log("Microsserviço de lembretes executando na porta 4000.")
});