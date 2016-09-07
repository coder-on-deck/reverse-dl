var express = require('express')
var bodyParser = require('body-parser')
var Rss = require('rss')
var _ = require('lodash')
var argv = require('minimist')(process.argv.slice(2))
var app = express()
var port = argv.port || 8090

app.use(bodyParser.json())

var feeds = {}

try {
  feeds = require('./dev/mock.json') // allow mock data
} catch (e) {
  console.log(e)
}

function getFeed (req, res, next) {
  var feedId = req.params.feedId
  if (!feeds[feedId]) {
    feeds[feedId] = {items: []}
  }
  req.feed = feeds[feedId]
  next()
}

app.post('/feed/:feedId/config', getFeed, function (req, res) {
  req.feed.feed = req.body
})

app.post('/feed/:feedId', getFeed, function (req, res) {
  req.feed.items.push(req.body)
})

app.get('/feed/:feedId', function (req, res) {
  var items = []
  var feed = new Rss()
  var length = req.query.length || 20
  var feedId = req.params.feedId
  if (feeds[feedId] && feeds[feedId].items) {
    feed = new Rss(feeds[feedId].feed)
    items = [].concat(_.reverse(_.last(feeds[feedId].items, length)))
  }
  _.each(items, function (i) {
    feed.item(i)
  })

  res.send(feed.xml({indent: true}))
})
app.listen(port, function () {
  console.log('listening on ' + port)
})
