import express, { Router } from 'express'
import { speechController } from '../controller/speech.controller'

const router: Router = express.Router()

router.get('', speechController)

export const speechRouter = router
