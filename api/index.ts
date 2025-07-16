import { createNestServer } from '../src/main'
import { Server } from 'http'

let cachedServer: Server

export default async function handler(req, res) {
  if (!cachedServer) {
    cachedServer = await createNestServer()
  }
  cachedServer.emit('request', req, res)
}
