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
      console.log('doesnt')
      Item.create(software)
      .then((user) => {
        res.json(200, {itemName: user.ear, id: user._id, scripts: user.scripts})
        next()
        return
      })
      .catch((err) => {
        throw err
      })      
    } else {
      console.log('exist')
      res.json(406, {message: `${name} with version ${version} already exists`})
      next()
      return
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
      if (version === 'latest') {
        res.json(item[0])
      } else {
        Item.findOne({ear})
          .exec((err, i) => {
            if (err) throw err
            if (!i) {
              res.json({message: `package with version ${version} not found`})
              next()
            } else {
              res.json(i)
              next()
            }
          })
      }
    })
}

module.exports = ItemController