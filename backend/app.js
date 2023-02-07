import cors from 'cors'
import express, { json, urlencoded } from 'express'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import xss from 'xss-clean'

// Routes
import ordersRoutes from './routes/ordersRoute.js'
import accountRoutes from './routes/accountRoute.js'
import { protect } from './middleware/authMiddleware.js'

// initialize express spp
const app = express()

// middleWare
app.use(json())
app.use(urlencoded({ extended: false }))

// sanitize user input
app.use(xss())

// secure with various HTTP headers
app.use(helmet())
app.use(cors({ origin: true }))

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false // Disable the `X-RateLimit-*` headers
  })
)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

/** Routes here */
app.use(protect)

app.use('/account', accountRoutes)
app.use('/order_items', ordersRoutes)

// handle wildcard route error not found
app.all('*', (req, res, next) => {
  res
    .status(404)
    .json({ error: `Can't find ${req.originalUrl} on this server` })

  next()
})

export default app
