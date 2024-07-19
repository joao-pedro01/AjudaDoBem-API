import { Application } from "express";

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../helpers/swagger-output.json';

import User from './UserRoutes';



const routes = (app: Application) => {
    app.get('/api', (req, res)=> {
        res.status(200).json({
            message: 'AjudaDoBem API📲',
            version: '1.0.0'
        })
    });
    app.use('/api/docs', swaggerUi.serve);
    app.get('/api/docs', swaggerUi.setup(swaggerDocument));
    app.use('/api/',
        User
    );
};

export default routes;
