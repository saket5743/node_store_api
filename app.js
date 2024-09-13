const connectDB = require('./db/connect');
require('express-async-errors');
const express = require('express')
const app = express()
const CONNECT_URL = 'mongodb+srv://user:root1234@cluster0.rmel4sd.mongodb.net/STORE-API?retryWrites=true&w=majority&appName=Cluster0';

const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

const productRouter = require('./routes/product')

// middleware
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(CONNECT_URL)
    await app.listen(3000, () => {
      console.log('Server is listening at port 3000...')
    })
  } catch (error) {
    console.log(error)
  }
}

start();