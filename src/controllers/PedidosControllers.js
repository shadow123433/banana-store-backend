import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const controllers = {
    createPedido: async (req, res) => {
        const { item, quantidade, entrega } = req.body;

        console.log('Dados recebidos:', { item, quantidade, entrega });

        // O usuarioId vem do seu authMiddleware (req.usuarioId = decoded.id)
        const userId = req.usuarioId; 

        if (!item || !quantidade || !entrega) {
            return res.status(400).json({ error: 'Dados incompletos' });
        }

        try {
            const novoPedido = await prisma.pedido.create({
                data: {
                    item: item,
                    quantidade: parseInt(quantidade),
                    nome: entrega.nome,
                    endereco: entrega.endereco,
                    cidade: entrega.cidade,
                    bairro: entrega.bairro,
                    complemento: entrega.complemento || "",
                    telefone: entrega.telefone,
                    uf: entrega.uf,
                    
                    // --- OBRIGATÓRIO PARA O SEU SCHEMA ---
                    // Conecta o pedido ao usuário logado
                    usuario: {
                        connect: { id: userId }
                    }
                }
            });

            res.status(201).json({
                message: 'Pedido criado com sucesso!',
                pedido: novoPedido
            });
        } catch (error) {
            console.error("Erro Prisma:", error);
            res.status(500).json({ error: 'Erro ao salvar no banco' });
        }
    }
}

export default controllers;