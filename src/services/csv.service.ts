import { readFile } from 'fs/promises'

class csvService {
  async readCsvFile(fileName: string) {
    const csvFile = await readFile(fileName)
    return csvFile.toString()
  }
}

export default new csvService()
