const express = require('express')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const User = require('../models/User')

const router = express.Router()

// REGISTER
router.post('/register', async (req, res) => {

  try {

    const {
      username,
      email,
      password,
      role
    } = req.body

    // CHECK USER
    const existingUser =
      await User.findOne({ email })

    if (existingUser) {

      return res.status(400).json({
        message: 'User already exists'
      })

    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10)

    // CREATE USER
    const user = new User({

      username,
      email,
      password: hashedPassword,
      role

    })

    await user.save()

    res.json({
      message: 'Registration Successful'
    })

  } catch (err) {

    res.status(500).json(err)

  }

})

// LOGIN
router.post('/login', async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body

    // FIND USER
    const user =
      await User.findOne({ email })

    if (!user) {

      return res.status(400).json({
        message: 'Invalid Credentials'
      })

    }

    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!isMatch) {

      return res.status(400).json({
        message: 'Invalid Credentials'
      })

    }

    // GENERATE TOKEN
    const token = jwt.sign(

      { id: user._id },

      process.env.JWT_SECRET

    )

    res.json({

      token,

      user: {

        id: user._id,
        username: user.username,
        role: user.role

      }

    })

  } catch (err) {

    res.status(500).json(err)

  }

})

module.exports = router