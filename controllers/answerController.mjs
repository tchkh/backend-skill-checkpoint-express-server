import connectionPool from '../utils/db.mjs'

export const createVoteByAnswerId = async (req, res) => {
  try {
    const isIdExists = await connectionPool.query({
      text: 'select exists (select * from answers where id = $1)',
      values: [req.params.id],
    })

    if (!isIdExists.rows[0].exists) {
      return res.status(404).json({ message: 'Answer not found.' })
    }

    if (![1, -1].includes(req.body.vote)) {
      return res.status(400).json({ message: 'Invalid vote value.' })
    }

    const result = await connectionPool.query({
      text: `
        insert into answer_votes (answer_id, vote)
        values ($1, $2)
        returning *`,
      values: [req.params.id, req.body.vote],
    })
    return res.status(200).json({
      message: 'Vote on the answer has been recorded successfully.',
    })
  } catch (error) {
    return res.status(500).json({ message: 'Unable to vote answer.' })
  }
}
