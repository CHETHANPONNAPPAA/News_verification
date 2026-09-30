const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const authRoutes = require('./routes/auth')
const newsRoutes = require('./routes/news')

const app = express()
const liveNewsRoutes =
  require('./routes/liveNews')
const userRoutes =
  require('./routes/users')


// MIDDLEWARE
app.use(cors())
app.use(express.json())

// ROUTES
app.use('/api', authRoutes)
app.use('/api/news', newsRoutes)

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(() => {

  console.log('MongoDB Connected')

})
.catch((err) => {

  console.log(err)

})

// TEST ROUTE
app.get('/', (req, res) => {

  res.send('TruthChain Backend Running')

})

// SERVER
app.listen(5000, () => {

  console.log('Server Running On Port 5000')

})
app.use(
  '/api/live-news',
  liveNewsRoutes
)
app.use(
  '/api/users',
  userRoutes
)