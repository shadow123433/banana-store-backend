import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

dotenv.config(); // Carrega as variáveis do arquivo .env

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log('--- Nova Requisição ---');
    console.log('Header Authorization:', authHeader);
    

    // Se o segurança não vir nenhum convite, ele já barra aqui
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }

    // O padrão do token é "Bearer <token>". Preciso separar o texto do código.
    const parts = authHeader.split(' '); // Divide o texto onde tem espaço

    if (parts.length !== 2) {
        return res.status(401).json({ error: 'Erro no formato do token.' });
    }

    const [scheme, token] = parts;

    // 3. Verifica se a primeira palavra é "Bearer" (padrão de mercado)
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: 'Token malformado.' });
    }

    // Usamos o process.env.JWT_SECRET para pegar a chave escondida
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // Se alguém tentou falsificar o token ou ele expirou
            return res.status(401).json({ error: 'Token inválido ou expirado.' });
        }

        // 5. Se deu tudo certo, pegamos o ID do usuário que estava guardado no token
        // e colocamos dentro da "req" (requisição) para o Controller saber quem é.
        req.usuarioId = decoded.id;

        // 6. O comando next() diz: "Segurança conferiu, pode passar para o DJ (Controller)"
        return next();
    });
};