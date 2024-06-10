import express, { json } from 'express'
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

export const createApp = ({ movieModel }) => {
  const app = express()
  app.use(json()) // espera por todos los paquetes

  app.use(corsMiddleware())
  const PORT = process.env.PORT ?? 3000
  app.disable('x-powered-by')

  app.get('/', (req, res) => {
    res.json({ mesage: 'Hola Mundo' })
  })

  app.use('/movies', createMovieRouter({ movieModel }))

  app.listen(PORT, () => {
    console.log(`Aplicacion escuchando en el puerto: http://localhost:${PORT} `)
  })
}
