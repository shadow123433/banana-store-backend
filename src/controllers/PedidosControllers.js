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
                    numeroCasa: entrega.numero,
                    cidade: entrega.cidade,
                    bairro: entrega.bairro,
                    complemento: entrega.complemento || "",
                    telefone: entrega.telefone,
                    uf: entrega.uf,
                    
    
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
    },


// --- BUSCAR PEDIDOS DO USUÁRIO LOGADO ---
    getMeusPedidos: async (req, res) => {
        try {
            // O authMiddleware já conferiu o token e nos deu esse ID:
            const userId = req.usuarioId;

            const pedidos = await prisma.pedido.findMany({
                where: {
                    usuarioId: userId // Busca apenas os pedidos desse cara
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            return res.status(200).json(pedidos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao buscar pedidos' });
        }
    },


cancelarPedido: async (req, res) => {
    const id = req.params.id;
    const userId = req.usuarioId;

    try {
        const pedido = await prisma.pedido.findFirst({
            where: {
                id,
                usuarioId: userId
            }
        });

        if (!pedido) {
            return res.status(404).json({
                error: 'Pedido não encontrado ou não pertence a você'
            });
        }

        // Evita cancelar duas vezes (opcional, mas melhor)
        if (pedido.status === 'CANCELADO') {
            return res.status(400).json({
                error: 'Pedido já está cancelado'
            });
        }

        const atualizado = await prisma.pedido.update({
            where: { id },
            data: {
                status: 'CANCELADO'
            }
        });

        return res.json({
            message: 'Pedido cancelado com sucesso',
            pedido: atualizado
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao cancelar pedido' });
    }
}



}

export default controllers;