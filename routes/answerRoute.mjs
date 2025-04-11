import { Router } from 'express'
import { createVoteByAnswerId } from '../controllers/answerController.mjs'

const answerRouter = Router()

answerRouter.post('/:id/vote', createVoteByAnswerId)

export default answerRouter
