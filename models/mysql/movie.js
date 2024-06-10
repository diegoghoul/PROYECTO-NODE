import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  password: '12345678',
  port: 3306,
  database: 'Movies_DataBase'
}

const connection = await mysql.createConnection(config)

export class movieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;',
        [lowerCaseGenre]
      )

      if (genres.length === 0) return []

      const [{ id }] = genres
      const [movie] = await connection.query(
        'SELECT BIN_TO_UUID(m.id) id, title, year, director, duration, poster, rate FROM movie m JOIN movie_genre mg ON m.id = mg.movie_id WHERE mg.genre_id = ?;',
        [id]
      )
      return movie
    }

    const [movie] = await connection.query(
      'SELECT  BIN_TO_UUID(id) as id,title, year, director, duration, poster, rate FROM movie'
    )
    return movie
  }

  static async getById ({ id }) {
    const [movie] = await connection.query(
      'SELECT  BIN_TO_UUID(id) as id,title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);',
      [id]
    )
    if (movie.length === 0) {
      return null
    }
    return movie
  }

  static async create ({ input }) {
    const { title, year, director, duration, poster, rate, genre } = input
    const [UUID_RESULT] = await connection.query('SELECT UUID() as uuid;')
    const [{ uuid }] = UUID_RESULT
    try {
      await connection.query('INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN(?),?,?,?,?,?,?);',
        [uuid, title, year, director, duration, poster, rate]
      )
      for (const genreName of genre) {
        const [genresId] = await connection.query('SELECT id FROM genre WHERE name = ?;', [genreName])
        const id = genresId[0].id
        await connection.query('INSERT INTO movie_genre (movie_id, genre_id) VALUES (UUID_TO_BIN(?), ?);', [uuid, id])
      }
    } catch (error) {
      throw new Error('Error creando la pelicula')
    }
    const [movie] = await connection.query(
      'SELECT  BIN_TO_UUID(id) as id,title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);',
      [uuid]
    )
    return movie[0]
  }

  static async delete ({ id }) {
    const [movie] = await connection.query(
      'DELETE FROM movie WHERE id = UUID_TO_BIN(?); ',
      [id]
    )
    if (movie.affectedRows === 0) {
      return false
    }
    return movie
  }

  static async update ({ id, input }) {
    //  TAREA CREAR EL UPDATE
  }
}
