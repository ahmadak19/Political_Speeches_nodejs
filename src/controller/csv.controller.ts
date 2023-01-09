import { Request, RequestHandler, Response } from 'express'
import csvService from '../services/csv.service'

export const csvController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const speeches = await csvService.readCsvFile(req.params.fileName)
  res.set({ 'Content-Type': 'text/csv' }).send(speeches)
}
