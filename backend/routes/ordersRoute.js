import { Router } from 'express'
import {
  deleteOrderItem,
  getOrderItems
} from '../controllers/ordersController.js'
import { protect } from '../middleware/authMiddleware.js'

const routes = Router()

routes.use(protect)

routes.get('/', getOrderItems)

routes.route('/:id').delete(deleteOrderItem)

export default routes
