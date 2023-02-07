import { MongoClient } from 'mongodb'

// Connection URL
const client = new MongoClient('mongodb://127.0.0.1:27017')

// Database Name
const dbName = 'olist'

const connectDb = async () => {
  try {
    // connect to mongodb cluster
    await client.connect()
    // Establish and verify connection
    console.log('DB connected successfully')
    return client.db(dbName)
  } catch (e) {
    console.log(e)
  }
  // finally {
  //   await client.close();
  // }
}

const db = await connectDb()

export default db
