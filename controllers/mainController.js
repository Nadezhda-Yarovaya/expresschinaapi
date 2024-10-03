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
const favsIdlist = req.body;

Card.find({}) // тут и не сделано вывод только избранных
.then((foundAll) => {
  const foundFavs = foundAll.filter((item) => favsIdlist.includes(item.id));
  console.log('filtered: ', foundFavs);
  // foundFavs.sort( () => .5 - Math.random() ); 
res.status(201).send(foundFavs);
})
.catch((err) => {
    next(err);
  });
}

module.exports.getBySource =  (req, res, next) => {
  const { source } = req.params;
  console.log('source i took: ', source);
  
  Card.find({ source: source })
  .then((foundBySource) => {
    // foundFavs.sort( () => .5 - Math.random() ); 
    console.log('foundBySource: ', foundBySource);
  res.status(201).send(foundBySource);
  })
  .catch((err) => {
      next(err);
    });
    
  }
