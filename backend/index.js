import { config } from 'dotenv'

import app from './app.js'
config({ path: './config.env' })

const port = process.env.PORT || 5000

app.listen(port, () => console.log('server listening on port: ', port))
