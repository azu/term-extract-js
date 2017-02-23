'use strict'

const https = require('https')
const parse5 = require('parse5')
const TermExtract = require('./lib/main.js').TermExtract
const LRScore = require('./lib/main.js').FrequencyLeftRightScore
const FrequencyScore = require('./lib/main.js').FrequencyScore
const MeCab = require('./lib/main.js').MeCabFrequency

https.get('https://ja.wikipedia.org/wiki/THE_IDOLM@STER%E3%81%AE%E7%99%BB%E5%A0%B4%E4%BA%BA%E7%89%A9', (res) => {
  const statusCode = res.statusCode

  let error
  if (statusCode !== 200) {
    error = new Error(`Request Failed.\n` +
                      `Status Code: ${statusCode}`)
  }
  if (error) {
    console.log(error.message)
    // consume response data to free up memory
    res.resume()
    return
  }

  res.setEncoding('utf8')
  let rawData = ''
  res.on('data', (chunk) => rawData += chunk)
  res.on('end', () => {
    try {
      const document = parse5.parse(rawData)
      const str = innerText(document.childNodes[1].childNodes[2])
      const meCab = new MeCab(str)
      const termExtract = new TermExtract(
        new LRScore(meCab),
        new FrequencyScore(meCab)
      )
      const importance = termExtract.calculateFLR()

      console.log([...importance].join('\n'))
    } catch (e) {
      console.log(e.message)
    }
  })
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`)
})

function innerText(dom) {
  let str = ''
  if (dom.nodeName === '#text') {
    str += dom.value
    return str.trim()
  }
  if (dom.nodeName === 'script') return str
  if (dom.nodeName === 'noscript') return str
  if (! dom.hasOwnProperty('childNodes')) return str
  for (let i = 0; i < dom.childNodes.length; i++) {
    str += innerText(dom.childNodes[i])
  }
  return str.trim()
}
