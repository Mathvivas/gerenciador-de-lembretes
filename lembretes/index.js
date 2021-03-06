// Para inicializar o server: npm start

const express = require ('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const lembretes = {};
contador = 0;

app.get('/lembretes', (req, res) => {
    //res.status(200).send({"Resultado ": "OK"});
    res.send(lembretes);
});

app.put('/lembretes', (req, res) => {
    // {texto: "Fazer café", id: 1, autor: Ana}
    const { texto } = req.body;     // Pega somente o texto do json
    contador++;
    /*
        {
            1: {
                contador: 1, texto: Fazer cafe,
            }
            2: {
                contador: 2, texto: ver um filme
            }
        }
    */
    lembretes[contador] = {
        contador, texto
    };

    res.status(201).send(lembretes[contador]);
});

app.listen(4000, () => {
    console.log("Microsserviço de lembretes executando na porta 4000.")
});