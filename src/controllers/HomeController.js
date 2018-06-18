import createError from 'http-errors'
import Item from '../models/Item'
import { RSA_NO_PADDING } from 'constants';

var HomeController = {}

HomeController.list = function(req, res, next) {
  Item.find({}, (err, data) => {
    if (err) {
      next(new createError.InternalServerError())
    } else {
      var response = {
        count: data.length,
        totalDownloads: data.reduce((a, b) => a + b.downloads, 0),
        data
      }
      res.json(200, response)
    }
  })
}

module.exports = HomeController