import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const controllers = {

    // --- CRIAR PEDIDO ---
    createPedido: async (req, res) => {
        try {
            const { item, quantidade, entrega } = req.body;
            const userId = req.usuarioId;

            console.log('USER ID:', userId);
            console.log('BODY:', req.body);

            // 🔐 valida autenticação
            if (!userId) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }

            // 📦 valida dados básicos
            if (!item || !quantidade || !entrega) {
                return res.status(400).json({ error: 'Dados incompletos' });
            }

            // 🔍 valida quantidade
            const qtd = parseInt(quantidade);
            if (isNaN(qtd) || qtd <= 0) {
                return res.status(400).json({ error: 'Quantidade inválida' });
            }

            // 🔍 valida entrega (sem exagero, mas segura)
            if (
                !entrega.nome ||
                !entrega.endereco ||
                !entrega.numero ||
                !entrega.cidade ||
                !entrega.bairro ||
                !entrega.telefone ||
                !entrega.uf
            ) {
                return res.status(400).json({ error: 'Dados de entrega inválidos' });
            }

            const novoPedido = await prisma.pedido.create({
                data: {
                    item,
                    quantidade: qtd,
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

            return res.status(201).json({
                message: 'Pedido criado com sucesso!',
                pedido: novoPedido
            });

        } catch (error) {
            console.error("Erro createPedido:", error);
            return res.status(500).json({ error: 'Erro ao salvar no banco' });
        }
    },


    // --- BUSCAR PEDIDOS ---
    getMeusPedidos: async (req, res) => {
        try {
            const userId = req.usuarioId;

            if (!userId) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }

            const pedidos = await prisma.pedido.findMany({
                where: { usuarioId: userId },
                orderBy: { createdAt: 'desc' }
            });

            return res.status(200).json(pedidos);

        } catch (error) {
            console.error("Erro getMeusPedidos:", error);
            return res.status(500).json({ error: 'Erro ao buscar pedidos' });
        }
    },


    // --- CANCELAR PEDIDO ---
    cancelarPedido: async (req, res) => {
        try {
            const userId = req.usuarioId;

            if (!userId) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }

            // ⚠️ NÃO força parseInt sem saber o tipo do banco
            const id = req.params.id;

            const pedido = await prisma.pedido.findFirst({
                where: {
                    id: id,
                    usuarioId: userId
                }
            });

            if (!pedido) {
                return res.status(404).json({
                    error: 'Pedido não encontrado ou não pertence a você'
                });
            }

            if (pedido.status === 'CANCELADO') {
                return res.status(400).json({
                    error: 'Pedido já está cancelado'
                });
            }

            const atualizado = await prisma.pedido.update({
                where: { id: id },
                data: { status: 'CANCELADO' }
            });

            return res.json({
                message: 'Pedido cancelado com sucesso',
                pedido: atualizado
            });

        } catch (error) {
            console.error("Erro cancelarPedido:", error);
            return res.status(500).json({ error: 'Erro ao cancelar pedido' });
        }
    }

}

export default controllers;