const express = require('express')

const User = require('../models/User')

const router = express.Router()

// GET ALL USERS
router.get('/', async (req, res) => {

  try {

    const users =
      await User.find()

    res.json(users)

  } catch (err) {

    res.status(500).json(err)

  }

})

// PROMOTE USER
router.put('/promote/:id', async (req, res) => {

  try {

    await User.findByIdAndUpdate(

      req.params.id,

      {

        role: 'validator'

      }

    )

    res.json({

      message:
        'User Promoted'

    })

  } catch (err) {

    res.status(500).json(err)

  }

})

// DELETE USER
router.delete('/:id', async (req, res) => {

  try {

    await User.findByIdAndDelete(
      req.params.id
    )

    res.json({

      message:
        'User Deleted'

    })

  } catch (err) {

    res.status(500).json(err)

  }

})

module.exports = router