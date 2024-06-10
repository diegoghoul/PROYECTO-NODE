import cors from 'cors'

const originAllowed = ['http://localhost:8080',
  'http://www.diegoperez.me',
  'http://localhost:3010'
]

export const corsMiddleware = ({ options = originAllowed } = {}) => cors({
  origin: (origin, callback) => {
    if (originAllowed.includes(origin) || !origin) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
  }
})
