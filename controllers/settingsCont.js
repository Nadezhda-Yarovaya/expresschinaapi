const Setting = require('../models/Setting');
module.exports.checkMaintanence = (req, res, next) => {

    console.log('checking maint actually');
  Setting.find({})
    .then((result) => {
      const maintSending = {maint: result[0].maint};
    //  console.log('result: ', maintSending);
      res.status(201).send(maintSending);
    })
    .catch((err) => {
      next(err);
    });
}
