module.exports = app => {
  app.get('/healthz', (req, res) => {
    return res.json({ status: 'pass' })
  })
}
