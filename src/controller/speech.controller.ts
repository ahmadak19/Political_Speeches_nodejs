import { Request, RequestHandler, Response } from 'express'
import speechService from '../services/speech.service'

export const speechController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  // console.log(req.query.url)
  const speeches = await speechService.getSpeeches(req.query.url)
  const mostSpeech = speechService.mostSpeeches(speeches, 2013)
  const mostTopic = speechService.mostTopics(speeches, 'Internal Security')
  const fewestWords = speechService.fewestWords(speeches)

  res.json({
    mostSpeeches: mostSpeech,
    mostSecurity: mostTopic,
    leastWordy: fewestWords,
  })
}
