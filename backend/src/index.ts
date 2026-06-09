import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes'
import productRoutes from './routes/product.routes'



const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend running' })
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

