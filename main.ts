import express from 'express'
import * as http from 'http'
import * as https from 'https'
import { sslOption } from './src/configs/configs'
import { csvRouter } from './src/routes/csv.route'
import { speechRouter } from './src/routes/speech.route'

const PORTSSL = process.env.PORT || 3001
const PORT = process.env.PORT || 3000

const app: express.Application = express()

app.use('/evaluation', speechRouter)
app.use('/csv', csvRouter)

const server: http.Server = http.createServer(app)
const serverSSL: https.Server = https.createServer(sslOption, app)
server.listen(PORT, () => console.log('Server listening on port', PORT))
serverSSL.listen(PORTSSL, () =>
  console.log('Server listening on port', PORTSSL)
)
