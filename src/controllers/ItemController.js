import createError from 'http-errors'
import Item from '../models/Item'

var ItemController = {}

ItemController.create = function (req, res, next) {
  const { name, version, description, license, author, website, docs, scripts } = req.body
  const ear = `${name}@${version}`

  var software = {
    ear,
    name,
    version,
    description,
    license,
    author,
    website,
    docs,
    scripts
  }

  Item.exists(ear, (exists) => {
    if (!exists) {
      Item.create(software)
      .then((user) => {
        res.json(200, {itemName: user.ear, id: user._id, scripts: user.scripts})
      })
      .catch((err) => {
        next(new createError.InternalServerError())
      })
    } else {
      res.json(400, {message: `${name} with version ${version} already exists`})
    }
  })
}

ItemController.read = function (req, res, next) {
  var name = req.params.name
  var version = req.params.version || 'latest'
  var ear = `${name}@${version}`
  Item.find({name})
    .sort('-date')
    .exec((err, item) => {
      if (err) next(new createError.InternalServerError())
      if (version === 'latest') {
        if(req.headers.download) Item.download(item[0].ear)
        res.json(200, item[0])
      } else {
        Item.findOne({ear})
          .exec((err, i) => {
            if (err) next(new createError.InternalServerError())
            if (!i) {
              res.json(404, {message: `package with version ${version} not found`})
            } else {
              if(req.headers.download) Item.download(i.ear)
              res.json(200, i)
            }
          })
      }
    })
}

ItemController.list = function (req, res, next) {
  var name = req.params.name
  Item.find({name})
    .select('ear downloads -_id')
    .exec((err, data) => {
      var totalDownloads = 0 
      data.forEach(version => {
        totalDownloads += version.downloads
      });
      if (err) next(new createError.InternalServerError())
      res.json(200, {downloads: totalDownloads, count: data.length, data})
    })
}

module.exports = ItemController