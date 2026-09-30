const CryptoJS = require('crypto-js')

// GENERATE HASH
const generateHash = (

  title,
  description,
  previousHash

) => {

  const data =

    title +
    description +
    previousHash +
    Date.now()

  return CryptoJS
    .SHA256(data)
    .toString()

}

// GENERATE BLOCK ID
const generateBlockId = () => {

  return (

    'BLOCK-' +

    Math.floor(
      Math.random() * 1000000
    )

  )

}

module.exports = {

  generateHash,
  generateBlockId

}