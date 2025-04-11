import { Router } from 'express'
import {
  createAnswerForQuestion,
  createQuestion,
  deleteQuestion,
  getAllquestions,
  getQuestionById,
  getQuestionBySearch,
  updateQuestion,
} from '../controllers/questionController.mjs'

const questionRouter = Router()

questionRouter.get('/search', getQuestionBySearch)
questionRouter.get('/', getAllquestions)
questionRouter.get('/:id', getQuestionById)
questionRouter.post('/', createQuestion)
questionRouter.post('/:id/answers', createAnswerForQuestion)
questionRouter.put('/:id', updateQuestion)
questionRouter.delete('/:id', deleteQuestion)

export default questionRouter
