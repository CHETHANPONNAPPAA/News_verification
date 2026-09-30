const express = require('express')

const axios = require('axios')

const { exec } = require('child_process')

const router = express.Router()

router.get('/', async (req, res) => {

  try {

    // FETCH LIVE NEWS
    const response = await axios.get(

      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`

    )

    const articles =
      response.data.articles.slice(0, 10)

    const verifiedNews = []

    for (const article of articles) {

      const text =
        article.title || ''

      // RUN AI MODEL
      const result =
        await new Promise((resolve) => {

          exec(

            `python ai/predict.py "${text}"`,

            (error, stdout) => {

              if (error) {

                resolve('Unknown|0')

              } else {

                resolve(stdout.trim())

              }

            }

          )

        })

      const split =
        result.split('|')

      verifiedNews.push({

        title: article.title,

        source:
          article.source.name,

        image:
          article.urlToImage,

        url:
          article.url,

        status: split[0],

        aiScore: split[1]

      })

    }

    res.json(verifiedNews)

  } catch (err) {

    console.log(err)

    res.status(500).json(err)

  }

})

module.exports = router