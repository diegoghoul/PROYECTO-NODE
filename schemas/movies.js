import z from 'zod'

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number().max(2024).min(1900).int(),
  director: z.string().min(8),
  duration: z.number().positive(),
  poster: z.string().url({ message: 'Poster must be a valid URL' }),
  genre: z.array(z.enum(['Action', 'Adventure', 'Drama', 'Romance', 'Sci-Fi', 'Thriller', 'Comedy', 'Fantasy', 'Horror']),
    {
      required_error: 'Movie genre is required.',
      invalid_type_error: 'Movie genre must be an Array of enum Genre'
    }),
  rate: z.number().min(0).max(10).default(5) // Se puede usar .optional() para que no sea obligatorio
})

export function validateMovie (object) {
  return movieSchema.safeParse(object)
}
export function validateMoviePartial (object) {
  return movieSchema.partial().safeParse(object)
}
