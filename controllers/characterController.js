const Character = require("../models/Character");

module.exports.createCharcterCard = (req, res, next) => {
    console.log(req.body);
    const {id, character, pinyin, translate} = req.body;

    Character.create({id, character, pinyin, translate})
    .then((createdCard) => {
        // access to send
        const toSend = {
          success: true,
          card: createdCard,
        };
        console.log('sending: ', toSend);
        res.status(201)
          .send(toSend);
      })
        .catch((err) => {
            console.log('err: ', err);
          /*if (err.name === 'MongoServerError' && err.code === 11000) {
            next(new ConflictError(alreadyExistsMessage));
          } else {
            next(err);
          }*/
        });

}

module.exports.createCardMultiple = (req, res, next) => {
    console.log(req.body);
    const bodyArray = req.body;

    bodyArray.forEach((item) => {
        const {id, character, pinyin, translate, cat} = item;
    
    Character.create({id, character, pinyin, translate, cat})
    .then((createdCard) => {
        // access to send
        const toSend = {
          success: true,
        };
        res.status(201)
          .send(toSend);
      }).catch((err) => {console.log(err)});
    });

}

module.exports.getCCharactersByNumber =  (req, res, next) => {
    const { numb } = req.params;
    console.log('numb: ', numb);
    Character.find({})
    .then((alltheCards) => {
        alltheCards.sort( () => .5 - Math.random() ); // saying its a bad solution for shuffle
        const cutCards = alltheCards.slice(0, numb);
    res.status(201).send(cutCards);
    })
    .catch((err) => {
        next(err);
      });

}