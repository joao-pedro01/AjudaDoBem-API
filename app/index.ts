import app from "./src/app";
const port = process.env.APP_PORT || 4000;

app.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}/api`);
});
