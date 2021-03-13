// Para inicializar o server: npm start
// Para listar um processo em certo port: lsof -i:PORT
// Para matar um processo em certo port: kill $(lsof -t -i:PORT)

const express = require ('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const lembretes = {};
contador = 0;

app.get('/lembretes', (req, res) => {
    //res.status(200).send({"Resultado ": "OK"});
    res.send(lembretes);
});

app.put('/lembretes', async (req, res) => {
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

    await axios.post('http://localhost:10000/eventos', {
        tipo: "LembreteCriado",
        dados: { contador, texto }
    });

    res.status(201).send(lembretes[contador]);
});

app.post('/eventos', (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: 'ok' });
});

app.listen(4000, () => {
    console.log("Microsserviço de lembretes executando na porta 4000.")
});