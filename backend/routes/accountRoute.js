import { Router } from 'express'
import {
  authenticateUser,
  updateAccount
} from '../controllers/accountController.js'
import { protect } from '../middleware/authMiddleware.js'

const routes = Router()

routes.use(protect)

routes.route('/').post(authenticateUser).patch(updateAccount)

export default routes
