import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb'

const uri = 'your uri'
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})
async function connect () {
  try {
    await client.connect()
    const database = client.db('movies')
    return database.collection('movies')
  } catch (error) {
    console.error('Error connecting to the database')
    await client.close()
  }
}

export class movieModel {
  static async getAll ({ genre }) {
    const db = await connect()
    try {
      if (genre) {
        return db.find({
          genre: {
            $elemMatch: {
              $regex: genre,
              $options: 'i'
            }
          }
        }).toArray()
      }
      return db.find({}).toArray()
    } catch (error) {
      console.log('Ocurrio un error en la busqueda de peliculas')
      return false
    }
  }

  static async getById ({ id }) {
    try {
      const db = await connect()
      return db.findOne({ _id: new ObjectId(id) })
    } catch (error) {
      console.log('Ocurrio un error en la busqueda de la pelicula.')
      return false
    }
  }

  static async create ({ input }) {
    try {
      const db = await connect()
      const { insertedId } = db.insertOne(input)
      return { id: insertedId, ...input }
    } catch (error) {
      console.log('Error insertando documento')
      return false
    }
  }

  static async delete ({ id }) {
    try {
      const db = await connect()
      const result = await db.deleteOne({ _id: new ObjectId(id) })
      const { deletedCount } = result
      return deletedCount > 0
    } catch (error) {
      console.log('Error eliminado documento')
      return false
    }
  }

  static async update ({ id, input }) {
    try {
      const db = await connect()
      const result = await db.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: input }, { returnNewDocument: true })
      return result
    } catch (error) {
      console.log('Error actualizando el documento')
    }
  }
}
