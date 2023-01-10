import express from 'express'
import * as http from 'http'
import * as https from 'https'
import { PORT, PORTSSL, sslOption } from './src/configs/configs'
import { csvRouter } from './src/routes/csv.route'
import { speechRouter } from './src/routes/speech.route'



const app: express.Application = express()
app.use('/evaluation', speechRouter)
app.use('/csv', csvRouter)

const server: http.Server = http.createServer(app)
const serverSSL: https.Server = https.createServer(sslOption, app)
server.listen(PORT, () => console.log('Server listening on port', PORT))
serverSSL.listen(PORTSSL, () =>
  console.log('SSL-Server listening on port', PORTSSL)
)
