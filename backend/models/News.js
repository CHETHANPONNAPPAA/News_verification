const mongoose = require('mongoose')

const NewsSchema = new mongoose.Schema({

  title: {

    type: String,
    required: true

  },

  description: {

    type: String,
    required: true

  },

  status: {

    type: String,
    default: 'Pending'

  },

  aiScore: {

    type: Number,
    default: 0

  },

  blockId: {

    type: String

  },

  newsHash: {

    type: String

  },

  previousHash: {

    type: String,
    default: '0'

  },

  createdAt: {

    type: Date,
    default: Date.now

  }

})

module.exports =
  mongoose.model('News', NewsSchema)