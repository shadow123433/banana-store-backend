import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const controllers = {
    createPedido: async (req, res) => {
        const { itens } = req.body;

        console.log('Pedido recebido:', { itens });

        if (!itens) {
            return res.status(400).json({ error: 'O campo itens é obrigatório' });
        }

        try {
            // AQUI O PRISMA SALVA NO MONGO
            const novoPedido = await prisma.pedido.create({
                data: {
                    itens: itens
                }
            });

            res.status(201).json({
                message: 'Pedido criado no banco com sucesso!',
                pedido: novoPedido
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao salvar no banco de dados' });
        }
    }
}

export default controllers;