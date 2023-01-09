import express, { Router } from 'express'
import { csvController } from '../controller/csv.controller'

const router: Router = express.Router()

router.get('/:fileName', csvController)

export const csvRouter = router
