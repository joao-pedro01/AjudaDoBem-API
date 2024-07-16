import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../helpers/swagger-output.json';

const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permitir todas as origens, use '*' ou especifique domínios
    res.header('Access-Control-Allow-Methods', '*'); // Métodos permitidos
    res.header('Access-Control-Allow-Headers', '*'); // Cabeçalhos permitidos
    next();
});

app.use(express.json()) //Habilita o parse do JSON

//Removendo o x-powered-by por segurança
app.disable('x-powered-by')

//Rota default
app.get('/api', (req, res)=> {
    res.status(200).json({
        message: 'AjudaDoBem API📲',
        version: '1.0.0'
    })
})

app.use('/api/docs', swaggerUi.serve);
app.get('/api/docs', swaggerUi.setup(swaggerDocument));

export default app;