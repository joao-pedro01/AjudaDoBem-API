import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { validationResult } from 'express-validator';
import User from '../models/UserModel';
import ErrorInterface from 'src/models/ErrorInterface';

// Endpoint para receber a foto
async function uploadPhoto(req: any, res: any) {
    try {
        let patch = null;
        // Verifica se foi recebida uma foto
        
        return req.file.filename;

        //Retorna o nome do arquivo recebido
        res.status(200).json({ message: 'Foto recebida com sucesso', filename: req.file.filename });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao processar a foto recebida' });
    }
}

export async function createUser(req: any, res: any) {
    /* 
        #swagger.tags = ['Users']
        #swagger.description = 'Endpoint para criar um novo usuário'
        #swagger.parameters['newUser'] = {
            in: 'body',
            description: 'Informações do usuário',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/User" }
        }
        #swagger.responses[200] = { 
            description: 'Usuário criado com sucesso',
            schema: { $ref: "#/definitions/User" }
        }
        #swagger.responses[400] = { 
            description: 'Erro ao criar usuário',
            schema: { $ref: "#/definitions/Error" }
        }
    */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    let { name, email, password, phone, cpf, birthDate,zipCode} = req.body;
    const user: User = new User(cpf);
    user.setName(name);
    user.setEmail(email);
    user.setPassword(password);
    user.setPhone(phone);
    user.setCpf(cpf);
    user.setBirthDate(birthDate);
    user.setZipCode(zipCode);

    user.userIsRegistered().then((isRegistered: ErrorInterface[]) => {
        if (isRegistered[0] || isRegistered[1]) {
            return res.status(400).json(isRegistered);
        }

        user.createUser().then((user: User) => {
            res.status(201).json(user);
        }).catch(() => {
            res.status(500).json({ message: 'Erro ao criar usuário' });
        });
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao criar usuário' });
    });
    
}
