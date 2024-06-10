import { Router } from 'express'
import { MovieControllers } from '../controllers/movies.js'

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router()

  const movieControllers = new MovieControllers({ movieModel })

  moviesRouter.get('/', movieControllers.getAll)

  moviesRouter.get('/:id', movieControllers.getById)

  moviesRouter.post('/', movieControllers.create)

  moviesRouter.patch('/:id', movieControllers.update)

  moviesRouter.delete('/:id', movieControllers.delete)
  return moviesRouter
}
