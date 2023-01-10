import { readFileSync } from 'fs'

export const sslOption = {
  key: readFileSync('./cert/server.key'),
  cert: readFileSync('./cert/server.cert'),
}

export const PORTSSL = 3001
export const PORT =  3000