const app = require('express')()
const bodyParser = require('body-parser')
const helmet = require('helmet')

app.use(helmet())
app.use(bodyParser.json())

require('./healthz')(app)
require('./searchbox')(app)

app.listen(8080)

console.log('booking-expert-api', 8080)

module.exports = app
