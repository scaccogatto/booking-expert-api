const https = require('https')
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

const buildLink = (id, lang) => `https://be.bookingexpert.it/book/websites/searchbox?hotel=${id}&amp;lang=${lang}`

const getHotelCachedFile = async (id, lang) => {
  // TODO: check if file exists, and age

  // build specific link
  const scriptLink = buildLink(id, lang)
  console.log(`Asking for ${scriptLink}`)
  const filePath = path.join('cache', id, lang)
  const fullFilePath = path.join(filePath, 'full.js')
  await buildBath(filePath)

  // touch hotel file
  const fStream = fs.createWriteStream(fullFilePath)

  // download!
  return new Promise((resolve, reject) => {
    const req = https.get(scriptLink, res => {
      if (res.statusCode !== 200) return reject({ status: 'fail', info: 'http error' })
      res.pipe(fStream)
      fStream.on('finish', () => {
        fStream.close(resolve.bind(undefined, { status: 'pass', data: fullFilePath }))
      })
    })

    req.on('error', err => {
      fStream.unlink(fullFilePath)
      reject({ status: 'fail', info: err })
    })
  })
}

const buildBath = path => new Promise((resolve, reject) => mkdirp(path, err => {
  if (err) return reject(err)
  resolve(path)
}))

const executeUnsafeJs = (js, nsName = 'it') => {
  // TODO: sandbox
  eval(js + '; var nameSpace = ' + nsName + ';')
  return nameSpace
}

const prettifyData = async (id, lang) => {
  try {
    const path = (await getHotelCachedFile(id, lang)).data
    const content = fs.readFileSync(path, { encoding: 'utf8' })

    const ns = executeUnsafeJs(content)
    const { hotel, layout, guests, guesttypes } = ns.bookingexpert.SearchBox
    return { status: 'pass', data: { hotel, layout, guests, guestTypes: guesttypes } }
  } catch (e) { return e }  
}

module.exports = prettifyData
