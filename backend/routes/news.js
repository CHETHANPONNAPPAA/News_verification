const express = require('express')

const { exec } = require('child_process')

const News = require('../models/News')

const {

  generateHash,
  generateBlockId

} = require('../blockchain/blockchain')

const router = express.Router()

// CREATE + VERIFY NEWS
router.post('/', async (req, res) => {

  try {

    const {
      title,
      description
    } = req.body

    // RUN AI MODEL
    exec(

      `python ai/predict.py "${description}"`,

      async (error, stdout, stderr) => {

        if (error) {

          console.log(error)

          return res.status(500).json({

            message: 'AI Prediction Failed'

          })

        }

        // OUTPUT FORMAT:
        // Verified|91

        const result =
          stdout.trim().split('|')

        const status = result[0]

        const aiScore =
          Number(result[1])

        // BLOCKCHAIN
        // GET LAST BLOCK
        const lastNews =
          await News.findOne()
          .sort({ createdAt: -1 })

        const previousHash =
          lastNews
          ? lastNews.newsHash
          : '0'

        // CREATE NEW HASH
        const newsHash =
          generateHash(

            title,
            description,
            previousHash

          )

        const blockId =
          generateBlockId()

        // SAVE TO DATABASE
        const news = new News({

          title,
          description,

          status,
          aiScore,

          newsHash,
          blockId,
          previousHash

        })

        await news.save()

        res.json(news)

      }

    )

  } catch (err) {

    console.log(err)

    res.status(500).json(err)

  }

})

// GET ALL NEWS
router.get('/', async (req, res) => {

  try {

    const news =
      await News.find()
      .sort({ createdAt: -1 })

    res.json(news)

  } catch (err) {

    res.status(500).json(err)

  }

})

// DASHBOARD STATS
router.get('/stats', async (req, res) => {

  try {

    const totalNews =
      await News.countDocuments()

    const realNews =
      await News.countDocuments({

        status: 'Verified'

      })

    const fakeNews =
      await News.countDocuments({

        status: 'Fake'

      })

    res.json({

      totalNews,
      realNews,
      fakeNews

    })

  } catch (err) {

    res.status(500).json(err)

  }

})
// DELETE NEWS
router.delete('/:id', async (req, res) => {

  try {

    await News.findByIdAndDelete(
      req.params.id
    )

    res.json({

      message:
        'News Deleted'

    })

  } catch (err) {

    res.status(500).json(err)

  }

})
module.exports = router