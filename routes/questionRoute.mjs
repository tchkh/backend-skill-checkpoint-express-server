import { Router } from 'express'
import {
  createAnswerForQuestion,
  createQuestion,
  deleteAnswerByQuestionId,
  deleteQuestion,
  getAllquestions,
  getAnswerByQuestionId,
  getQuestionById,
  getQuestionBySearch,
  updateQuestion,
  voteByQuestionId,
} from '../controllers/questionController.mjs'

const questionRouter = Router()

questionRouter.get('/search', getQuestionBySearch)
questionRouter.get('/', getAllquestions)
questionRouter.get('/:id', getQuestionById)
questionRouter.get('/:id/answers', getAnswerByQuestionId)
questionRouter.post('/', createQuestion)
questionRouter.post('/:id/answers', createAnswerForQuestion)
questionRouter.post('/:id/vote', voteByQuestionId)
questionRouter.put('/:id', updateQuestion)
questionRouter.delete('/:id', deleteQuestion)
questionRouter.delete('/:id/answers', deleteAnswerByQuestionId)

export default questionRouter
