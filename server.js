import express from 'express'
import cors from 'cors'
import Publicroutes from './src/routes/Authroutes.js'
import Pedidosroutes from './src/routes/PedidosRouter.js'

const app = express()
app.use(cors())
app.use(express.json())



app.use('/Auth', Publicroutes);
app.use('/Pedidos', Pedidosroutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
