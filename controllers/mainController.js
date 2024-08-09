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
    