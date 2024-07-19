import express from "express";
import multer from 'multer';
import { createUser } from "../controllers/UserController";
import { validaCadastro } from "../validators/UserValidator";

const router = express.Router();

// Configuração do Multer para o armazenamento de fotos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
 
const upload = multer({ storage: storage });


router
    .post('/user', validaCadastro, createUser)
    //.post('/user', upload.single('avatar'), createUser)
    //.post('/upload-photo', , uploadPhoto)

export default router;
