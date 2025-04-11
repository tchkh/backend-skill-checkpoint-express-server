import connectionPool from '../utils/db.mjs'

export const getAllquestions = async (req, res) => {
  try {
    const result = await connectionPool.query('select * from questions')
    return res.status(200).json({ data: result.rows })
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch questions.' })
  }
}

export const getQuestionById = async (req, res) => {
  try {
    const isIdExists = await connectionPool.query({
      text: 'select exists (select * from questions where id = $1)',
      values: [req.params.id],
    })

    if (!isIdExists.rows[0].exists) {
      return res.status(404).json({ message: 'Question not found.' })
    }

    const result = await connectionPool.query({
      text: 'select * from questions where id = $1',
      values: [req.params.id],
    })
    return res.status(200).json({ data: result.rows[0] })
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch questions.' })
  }
}

export const createQuestion = async (req, res) => {
  try {
    if (!req.body.title || !req.body.description || !req.body.category) {
      return res.status(400).json({ message: 'Invalid question data.' })
    }
    const result = connectionPool.query({
      text: `insert into questions (title, description, category) 
      values ($1, $2, $3)
      returning *`,
      values: [req.body.title, req.body.description, req.body.category],
    })
    return res.status(201).json({ message: 'Question created successfully.' })
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch questions.' })
  }
}

export const updateQuestion = async (req, res) => {
  try {
    if (!req.body.title || !req.body.description || !req.body.category) {
      return res.status(400).json({ message: 'Invalid question data.' })
    }

    const isIdExists = await connectionPool.query({
      text: 'select exists (select * from questions where id = $1)',
      values: [req.params.id],
    })

    if (!isIdExists.rows[0].exists) {
      return res.status(404).json({ message: 'Question not found.' })
    }

    const result = await connectionPool.query({
      text: `update questions set title = $1, description = $2, category = $3
      where id = $4 returning *`,
      values: [
        req.body.title,
        req.body.description,
        req.body.category,
        req.params.id,
      ],
    })
    return res.status(200).json({ message: 'Question updated successfully.' })
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch questions.' })
  }
}

export const deleteQuestion = async (req, res) => {
  try {
    const isIdExists = await connectionPool.query({
      text: 'select exists (select * from questions where id = $1)',
      values: [req.params.id],
    })

    if (!isIdExists.rows[0].exists) {
      return res.status(404).json({ message: 'Question not found.' })
    }

    const result = await connectionPool.query({
      text: `
      delete from questions where id = $1
      returning *`,
      values: [req.params.id],
    })

    if (result.rowCount > 0) {
      return res
        .status(200)
        .json({ message: 'Question post has been deleted successfully.' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch questions.' })
  }
}

export const getQuestionBySearch = async (req, res) => {
  try {
    // Extract ONLY allowed parameters
    const { title, category } = req.query

    // Validate no extra parameters were provided
    const allowedParams = ['title', 'category']
    const invalidParams = Object.keys(req.query).filter(
      param => !allowedParams.includes(param)
    )

    if (invalidParams.length > 0) {
      return res.status(400).json({ message: 'Invalid search parameters' })
    }

    // Start building the query
    let queryText = 'SELECT * FROM questions WHERE 1=1'
    const values = []
    let paramCount = 1

    // Add title filter if provided
    if (title) {
      queryText += ` AND title ILIKE $${paramCount++}`
      values.push(`%${title}%`)
    }

    // Add category filter if provided
    if (category) {
      queryText += ` AND category ILIKE $${paramCount++}`
      values.push(`%${category}%`)
    }

    // Execute the query
    const result = await connectionPool.query(queryText, values)

    return res.status(200).json({ data: result.rows })
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch questions.' })
  }
}

export const createAnswerForQuestion = async (req, res) => {
  try {
    // Extract ONLY allowed parameters
    const { content } = req.body

    if (!content || content.length > 300) {
      return res.status(400).json({ message: 'Invalid request data.' })
    }

    // Validate no extra parameters were provided
    const allowedParams = ['content']
    const invalidParams = Object.keys(req.body).filter(
      param => !allowedParams.includes(param)
    )

    if (invalidParams.length > 0) {
      return res.status(400).json({ message: 'Invalid request data.' })
    }

    const isIdExists = await connectionPool.query({
      text: 'select exists (select * from questions where id = $1)',
      values: [req.params.id],
    })

    if (!isIdExists.rows[0].exists) {
      return res.status(404).json({ message: 'Question not found.' })
    }

    const result = await connectionPool.query({
      text: `insert into answers (question_id, content) 
      values($1, $2)
      returning *`,
      values: [req.params.id, content],
    })
    return res.status(201).json({ message: 'Answer created successfully.' })
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch questions.' })
  }
}

export const getAnswerByQuestionId = async (req, res) => {
  try {
    const isIdExists = await connectionPool.query({
      text: 'select exists (select * from questions where id = $1)',
      values: [req.params.id],
    })

    if (!isIdExists.rows[0].exists) {
      return res.status(404).json({ message: 'Question not found.' })
    }

    const result = await connectionPool.query({
      text: `select id, content from answers where question_id = $1`,
      values: [req.params.id],
    })
    return res.status(200).json({ data: result.rows[0] })
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch questions.' })
  }
}
