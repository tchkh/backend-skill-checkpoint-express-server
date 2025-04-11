import express from 'express'
import questionRouter from './routes/questionRoute.mjs'
import answerRouter from './routes/answerRoute.mjs'

const app = express()
const port = 4000

app.use(express.json())

app.get('/test', (req, res) => {
  return res.json('Server API is working 🚀')
})

app.use('/questions', questionRouter)
app.use('/answers', answerRouter)

app.listen(port, () => {
  console.log(`Server is running at ${port}`)
})
