import { check, ValidationChain } from 'express-validator';

export const validaCadastro = [
    check('cpf')
        .isString().withMessage('O CPF deve ser uma string')
        .notEmpty().withMessage('O CPF é obrigatório')
        .isLength({ min: 11, max: 11 }).withMessage('O cpf informado é inválido')
        .custom((value: string) => {
            const cpf = value.replace(/[^\d]/g, ''); // Remove non-digit characters from the CPF
            let sum = 0;
            let remainder;

            if (
                cpf === '00000000000' ||
                cpf === '11111111111' ||
                cpf === '22222222222' ||
                cpf === '33333333333' ||
                cpf === '44444444444' ||
                cpf === '55555555555' ||
                cpf === '66666666666' ||
                cpf === '77777777777' ||
                cpf === '88888888888' ||
                cpf === '99999999999'
            ) {
                return Promise.reject('O cpf informado é inválido');
            }

            for (let i = 1; i <= 9; i++) {
                sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
            }

            remainder = (sum * 10) % 11;

            if (remainder === 10 || remainder === 11) {
                remainder = 0;
            }

            if (remainder !== parseInt(cpf.substring(9, 10))) {
                return Promise.reject('O cpf informado é inválido');
            }

            sum = 0;

            for (let i = 1; i <= 10; i++) {
                sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
            }

            remainder = (sum * 10) % 11;

            if (remainder === 10 || remainder === 11) {
                remainder = 0;
            }

            if (remainder !== parseInt(cpf.substring(10, 11))) {
                return Promise.reject('O cpf informado é inválido');
            }

            return Promise.resolve();
        }).withMessage('O cpf informado é inválido'),
    check('name')
        .isString().withMessage('O nome deve ser uma string')
        .notEmpty().withMessage('O nome é obrigatório')
        .isLength({ min: 2, max: 100 }).withMessage('O nome deve ter no mínimo 2 caracteres e no máximo 100 caracteres'),
    check('email')
        .isEmail().withMessage('O email é inválido')
        .notEmpty().withMessage('O email é obrigatório'),
    check('phone')
        .isString().withMessage('O telefone deve ser uma string')
        .notEmpty().withMessage('O telefone é obrigatório'),
    check('zipCode')
        .isString().withMessage('O CEP deve ser uma string')
        .notEmpty().withMessage('O CEP é obrigatório')
        .isLength({ min: 8, max: 8 }).withMessage('O cep informado é inválido'),
    check('birthDate')
        .isString().withMessage('A data de nascimento deve ser uma string')
        .notEmpty().withMessage('A data de nascimento é obrigatória'),
    check('password')
        .isString().withMessage('A senha deve ser uma string')
        .notEmpty().withMessage('A senha é obrigatória')
        .isLength({ min: 6, max: 25 }).withMessage('A senha deve ter no mínimo 6 caracteres e no máximo 25 caracteres')
];
