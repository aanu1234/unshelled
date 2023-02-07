import db from '../db.js'
import base64 from 'base-64'
import asyncHandler from 'express-async-handler'
const sellers = db.collection('sellers')

export const authenticateUser = asyncHandler(async (req, res) => {
  //   console.log(req.user);
  //   const { username, password } = req.body;

  const { seller_id, seller_zip_code_prefix } = req.user

  if (!req.user) {
    return res.status(400).json({ error: 'Authentication failed' })
  }

  const token = base64.encode(`${seller_id}:${seller_zip_code_prefix}`)

  res.status(200).json({ user: req.user, token })
})

export const updateAccount = asyncHandler(async (req, res) => {
  const { city, state } = req.body

  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized User Found' })
  }

  const seller_city = city.trim()
  const seller_state = state.trim()

  const updated = { seller_city, seller_state }

  const result = await sellers.updateOne(
    { seller_id: req.user.seller_id },
    { $set: updated }
  )

  if (!result.modifiedCount) {
    return res.status(400).json({ error: 'Invalid request sent' })
  }

  return res.status(200).json(updated)
})
