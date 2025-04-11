import { Router } from 'express'
import {
  createAnswerForQuestion,
  createQuestion,
  deleteQuestion,
  getAllquestions,
  getAnswerByQuestionId,
  getQuestionById,
  getQuestionBySearch,
  updateQuestion,
} from '../controllers/questionController.mjs'

const questionRouter = Router()

questionRouter.get('/search', getQuestionBySearch)
questionRouter.get('/', getAllquestions)
questionRouter.get('/:id', getQuestionById)
questionRouter.get('/:id/answers', getAnswerByQuestionId)
questionRouter.post('/', createQuestion)
questionRouter.post('/:id/answers', createAnswerForQuestion)
questionRouter.put('/:id', updateQuestion)
questionRouter.delete('/:id', deleteQuestion)

export default questionRouter
