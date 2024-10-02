const Card = require("../models/Card");

module.exports.getCardsByNumber =  (req, res, next) => {
    const { numb } = req.params;
    Card.find({})
    .then((alltheCards) => {
        alltheCards.sort( () => .5 - Math.random() ); // saying its a bad solution for shuffle
        const cutCards = alltheCards.slice(0, numb);
    res.status(201).send(cutCards);
    })
    .catch((err) => {
        next(err);
      });

}

module.exports.createCard = (req, res, next) => {
    console.log(req.body);
    const {id, source, taskEn, chin, pinyin} = req.body;
    Card.create({id, source, taskEn, chin, pinyin})
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

module.exports.getAllFavs =  (req, res, next) => {
console.log('get Favs: ', req.body);

Card.find({}) // тут и не сделано вывод только избранных
.then((foundFavs) => {
  foundFavs.sort( () => .5 - Math.random() ); 
res.status(201).send(foundFavs);
})
.catch((err) => {
    next(err);
  });
}

module.exports.getBySource =  (req, res, next) => {
  const { source } = req.params;
  console.log('source: ', source);
  
  Card.find({ source: source })
  .then((foundBySource) => {
    // foundFavs.sort( () => .5 - Math.random() ); 
    console.log('foundBySource: ', foundBySource);
    const toSend = {text: 'text so'};
    console.log('text to send : ', toSend);
  res.status(201).send(toSend);
  })
  .catch((err) => {
      next(err);
    });
    
  }
