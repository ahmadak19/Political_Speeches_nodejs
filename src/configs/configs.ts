import { readFileSync } from 'fs'

export const sslOption = {
  key: readFileSync('./cert/server.key'),
  cert: readFileSync('./cert/server.cert'),
}
