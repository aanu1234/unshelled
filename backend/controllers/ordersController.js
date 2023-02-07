import db from '../db.js'
import { ObjectId } from 'mongodb'
import asyncHandler from 'express-async-handler'
const orderItems = db.collection('order_items')
const sellers = db.collection('sellers')

export const getOrderItems = asyncHandler(async (req, res) => {
  // let { page, limit } = req.query;

  await sellers.createIndex({ seller_id: 1 }, { unique: true })
  // await sellers.dropIndex("seller_id_1");

  const page = Number(req.query.page) * 1 || 1
  const limit = req.query.limit * 1 || 20
  const skip = (page - 1) * limit

  const items = []
  let orderItemsList = []

  orderItemsList = await orderItems.aggregate([
    { $match: { seller_id: req.user.seller_id } },
    {
      $lookup: {
        from: 'products',
        localField: 'product_id',
        foreignField: 'product_id',
        as: 'products'
      }
    },
    { $unwind: '$products' },
    {
      $project: {
        _id: '$_id',
        id: '$order_item_id',
        product_id: 1,
        product_category: '$products.product_category_name',
        price: 1,
        date: '$shipping_limit_date'
      }
    },
    { $sort: { price: 1, shipping_limit_date: 1 } },
    {
      $skip: skip
    },
    {
      $limit: limit
    }
  ])

  await orderItemsList.forEach((item) => items.push(item))

  res.status(200).json({
    data: items,
    total: items.length,
    limit,
    offset: skip
  })
})

export const updateOrderItem = asyncHandler(async (req, res) => {
  const orderItem = req.body

  if (!ObjectId.isValid(req.params.id)) {
    return res.status(401).json({ error: 'Id not valid' })
  }

  const result = await orderItems.updateOne(
    { _id: new ObjectId(req.params.id), seller_id: req.user.seller_id },
    { $set: orderItem }
  )

  if (!result) {
    return res.status(404).json({ error: 'order item not found' })
  }

  res.status(200).json(result)
})

export const deleteOrderItem = asyncHandler(async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(401).json({ error: 'Id not valid' })
  }

  const result = await orderItems.deleteOne({
    _id: new ObjectId(req.params.id),
    seller_id: req.user.seller_id
  })

  if (!result.deletedCount) {
    return res.status(404).json({ error: 'Order item not found' })
  }

  res.status(200).json(result)
})
