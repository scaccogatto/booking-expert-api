const bridge = require('../bridge')

module.exports = app => {
  app.get('/book/websites/searchbox/:hotel/:lang', async (req, res) => {
    const { hotel, lang } = req.params
    console.log(`Requesting ${hotel}, ${lang}`)

    const result = await bridge(hotel, lang)
    if (result.status === 'pass') return res.json(result)

    return res.status(500).json(result)
  })
}
