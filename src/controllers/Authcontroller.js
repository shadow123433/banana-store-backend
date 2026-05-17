import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'; // Importante instalar: npm install bcrypt
dotenv.config();

const prisma = new PrismaClient();

const controllers = {
    // --- CADASTRO ---
    cadastro: async (req, res) => {
        const { nome, email, senha } = req.body;
        console.log('Cadastro recebido:', { nome, email });

        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        try {
            // Criptografando a senha antes de salvar (Segurança Pro)
            const salt = await bcrypt.genSalt(10);
            const senhaCriptografada = await bcrypt.hash(senha, salt);

            const novoUsuario = await prisma.user.create({
                data: {
                    nome,
                    email,
                    senha: senhaCriptografada
                }
            });

            const token = jwt.sign(
                { id: novoUsuario.id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            return res.status(201).json({
                message: 'Usuário cadastrado com sucesso',
                user: {
                    id: novoUsuario.id,
                    nome: novoUsuario.nome,
                    email: novoUsuario.email
                },
                token
            });

        } catch (error) {
            if (error.code === 'P2002') {
                return res.status(400).json({ error: 'Este email já está cadastrado' });
            }
            return res.status(500).json({ error: 'Erro interno ao salvar usuário' });
        }
    },

    // --- LOGIN ---
    login: async (req, res) => {
        try {
            const { email, senha } = req.body;
            console.log('login recebido:', { email });

            // 1. Procurar o usuário pelo e-mail usando o PRISMA
            const usuario = await prisma.user.findUnique({
                where: { email: email }
            });

            if (!usuario) {
                return res.status(404).json({ message: "E-mail ou senha incorretos!" });
            }

            // 2. Comparar a senha digitada com a criptografada no banco
            const senhaEhValida = await bcrypt.compare(senha, usuario.senha);

            if (!senhaEhValida) {
                return res.status(401).json({ message: "E-mail ou senha incorretos!" });
            }

            // --- AQUI É ONDE O MIDDLEWARE NASCE ---
            // Criamos o token usando o ID do usuário e a chave secreta do seu .env
            const token = jwt.sign(
                { id: usuario.id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' } // Token expira em 7 dias
            );

            return res.status(200).json({
                message: "Login realizado com sucesso!",
                user: { id: usuario.id, nome: usuario.nome },
                token: token // <--- IMPORTANTE: Enviar o token para o frontend
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro no servidor" });
        }
    },


};


export default controllers;