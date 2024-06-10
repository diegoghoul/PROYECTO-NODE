// import { movieModel } from '../models/local-file-system/movie.js'
// import { movieModel } from '../models/database/movie.js'
// import { movieModel } from '../models/mysql/movie.js'

import { validateMovie, validateMoviePartial } from '../schemas/movies.js'

export class MovieControllers {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.movieModel.getAll({ genre })
    res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getById({ id })
    if (movie) {
      return res.json(movie)
    }
    res.status(404).json({ Mesage: 'NOT FOUND' })
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)
    if (result.error) {
      return res.status(400).send({ error: JSON.parse(result.error) })
    }
    const newMovie = await this.movieModel.create({ input: result.data })
    res.header(201).json(newMovie)
  }

  update = async (req, res) => {
    const { id } = req.params
    const result = validateMoviePartial(req.body)
    if (result.error) {
      return res.statusCode(400).send({ error: JSON.parse(result.error) })
    }

    const statusPatch = await this.movieModel.update({ id, input: result.data })
    if (!statusPatch) {
      return res.statusCode(404).send({ error: 'MOVIE NOT FOUND' })
    }

    return res.status(201).json(statusPatch)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const deleteStatus = await this.movieModel.delete({ id })
    if (deleteStatus === false) {
      return res.status(404).send({ message: 'Movie not found' })
    }
    res.json({ message: 'Recurso Eliminado satisfactoriamente' })
  }
}
