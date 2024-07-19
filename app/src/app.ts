import express from 'express';
import cors from 'cors';
import routes from "./routes/index";
import path from 'path';
console.log('teste')
const app = express();

//Removendo o x-powered-by por segurança
app.disable('x-powered-by')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permitir todas as origens, use '*' ou especifique domínios
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Métodos permitidos
    res.header('Access-Control-Allow-Headers', '*'); // Cabeçalhos permitidos

    // Para interceptar requisições OPTIONS (pré-vôo)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
});



app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "..", "..", "uploads")));
routes(app);

export default app;
