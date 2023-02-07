import asyncHandler from 'express-async-handler'
import db from '../db.js'

const sellers = db.collection('sellers')

export const protect = asyncHandler(async (req, res, next) => {
  let accessToken, error

  // console.log(req.headers.authorization);

  if (!req.headers.authorization || !req.get('Authorization')) {
    error = new Error('Unauthorized Account')
    res.status(401).set('WWW-Authenticate', 'Basic')
    next(error)
  }

  if (req.headers?.authorization.startsWith('Basic')) {
    accessToken = req.headers.authorization.split(' ')[1]
  }

  if (!accessToken) {
    error = new Error('Not authorized')
    res.status(401).set('WWW-Authenticate', 'Basic')
    next(error)
  }

  // verify accessToken
  const decoded = Buffer.from(accessToken, 'base64').toString()

  const [seller_id, seller_zip_code_prefix] = decoded.split(':')

  const user = await sellers.findOne({ seller_id, seller_zip_code_prefix })

  if (!user) {
    error = new Error('Authentication failed')
    res.status(401).set('WWW-Authenticate', 'Basic')
    next(error)
  }

  req.user = user
  // console.log(req.user);
  next()
})
