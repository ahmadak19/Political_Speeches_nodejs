import axios, { AxiosResponse } from 'axios'
import csvParser from 'csv-parser'
import { Readable } from 'stream'
import { Speech } from '../types/speech.type'
import * as https from 'https'

class speechService {
  async getSpeeches(urls: any) {
    let speeches: Speech[] = []
    if (urls instanceof Array) {
      for (const url of urls) {
        const res: AxiosResponse = await this.fetchCsvFile(url)
        const speech = await this.parseCsv(res.data)
        speeches.push(...speech)
      }
    } else {
      const res: AxiosResponse = await this.fetchCsvFile(urls)
      const speech = await this.parseCsv(res.data)
      speeches = [...speech]
    }

    return speeches
  }

  fewestWords(speeches: Speech[]): string {
    let speaker: string = ''

    const wordsCount = speeches.reduce<Record<string, number>>(
      (allPolitical, speech) => {
        return {
          ...allPolitical,
          [speech.Speaker]: speech.Words + (allPolitical[speech.Speaker] ?? 0),
        }
      },
      {}
    )

    const min = Object.values(wordsCount).reduce<number>((min, current) => {
      return Math.min(min, current)
    }, Number.MAX_SAFE_INTEGER)

    for (const key in wordsCount) {
      if (wordsCount[key] === min) speaker = key
    }
    return speaker
  }
  mostTopics(speeches: Speech[], topic: string): string {
    const speaker = speeches
      .filter((speech) => speech.Topic === topic)
      .map((speech) => speech.Speaker)
    return [...new Set(speaker)].toString()
  }
  mostSpeeches(speeches: Speech[], year: number): string | null {
    let max: number = 0
    let speaker: string | null = null
    const speechesCount = speeches
      .filter((speech) => speech.Date.getFullYear() === year)
      .reduce<Record<string, number>>((allPolitical, speech) => {
        const currCount = allPolitical[speech.Speaker] ?? 0

        return {
          ...allPolitical,
          [speech.Speaker]: currCount + 1,
        }
      }, {})

    for (const political in speechesCount) {
      if (speechesCount[political] > max) {
        max = speechesCount[political]
        speaker = political
      }
    }

    return speaker
  }

  private async parseCsv(csvFile: string): Promise<Speech[]> {
    const speeches: Speech[] = []
    return new Promise((resolve) =>
      Readable.from(csvFile)
        .pipe(csvParser())
        .on('data', (data: Speech) => {
          speeches.push({
            Date: new Date(data.Date),
            Speaker: data.Speaker,
            Topic: data.Topic,
            Words: Number(data.Words),
          })
        })
        .on('end', () => resolve(speeches))
    )
  }

  private async fetchCsvFile(url: string) {
    return await axios.get(url, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })
  }
}

export default new speechService()
