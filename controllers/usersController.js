const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateToken,encodeToken } = require('../middlewares/jwt');
const { NotFoundError } = require('../errors/NotFoundError'); // combine them in index 
const { BadRequestError } = require('../errors/BadRequestError');
const { ConflictError } = require('../errors/ConflictError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const {
  notFoundMessage, wrongDataMessage, alreadyExistsMessage,
  wrongLoginDataMessage, successLoginMessage, successLogOutMessage, errorYes
} = require('../constants/messages');

const SALT_ROUND = 10;

module.exports.getUser = (req, res, next) => {
  const { authorization } = req.headers;
  const keytoken = authorization.split(' ')[1];
  const id = encodeToken(keytoken)._id;
  console.log('DECODED: ', id);
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Запрашиваемый пользователь не найден");
      }
      
      const toSend = {
        name: user.name,
        email: user.email,
      }
      console.log('user found by id to send: ', toSend);
      res.status(201).send(toSend);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports.registerUser = (req, res, next) => {
    const { name, email, password } = req.body;
  
    bcrypt.hash(password, SALT_ROUND)
      .then((hash) => {
        User.create({ name, email, password: hash }).then((createdUser) => {
          // access to send
          const toSend = {
            success: true,
            user: { name: createdUser.name, email: createdUser.email },
          };
          console.log('sending: ', toSend);
          res.status(201)
            .send(toSend);
        })
          .catch((err) => {
            if (err.name === 'MongoServerError' && err.code === 11000) {
              next(new ConflictError(alreadyExistsMessage));
            } else {
              next(err);
            }
          });
      })
      .catch(next);
  };

const addTokensToUser = (foundUser, accessToken, refreshToken, res, next) => {
  const opts = { new: true, runValidators: true };
          User.findByIdAndUpdate({ _id: foundUser._id }, {
            $set: {
              tokens: [...foundUser.tokens, {
                token: accessToken
              } ],
            },
          }, opts).then((updatedUser) => {
            // console.log('user after adding: ', updatedUser);
            // res.send(updatedUser);
            
          const toSend = {
            success: true,
            user: { name: updatedUser.name, email: updatedUser.email },
            accessToken: 'Bearer ' + updatedUser.tokens[0].token,
            refreshToken
          };
          console.log('loginToSend: ', toSend);
          res.status(201).send(toSend);
          }).catch((err) => {
            if (err.name === 'MongoServerError' && err.code === 11000) {
              next(new ConflictError(alreadyExistsMessage));
            } else { next(err); }
          });

}

  module.exports.loginUser = (req, res, next) => {
    const { email, password } = req.body;
    console.log('email: ', email);
    User.findOne({ email })
      .select('+password')
      .orFail(new NotFoundError(wrongLoginDataMessage))
      .then((foundUser) => {
        console.log('user: ', foundUser);
        bcrypt.compare(password, foundUser.password).then((matched) => {
          if (!matched) { return Promise.reject(new UnauthorizedError( wrongLoginDataMessage)); }
          // create both tokens          
        maxAgeReAccess = 1000 * 60 * 20; //20 mintues    
        const accessToken = generateToken(
            { _id: foundUser._id.toString(), name: foundUser.name, email: foundUser.email },
            maxAgeReAccess); //Access
            maxAgeRefresh = 1000 * 60 * 60 * 24 * 2; // 2 days 
          const refreshToken = generateToken({ _id: foundUser._id }, maxAgeRefresh); //Refresh
          // cookie is set on the front somehow...
          console.log('id: ', foundUser._id);
          // saving token to users DB
          addTokensToUser(foundUser, accessToken, refreshToken, res, next);
          
        })
          .catch((err) => {
            console.log('error first catch: ', err);
            next(err);
          });
      })
      .catch((err) => {
        console.log('error second catch: ', err);
        next(err);
      });
  };

  module.exports.makerefreshToken = (req, res, next) => {
    try {
      // 1 - get both tokens
      //refresh from cookies and access from header

      // 2 - find user by decoded refresh id and access token in the base 

      // delete this write 
        const { token } = req.body;
        const id = encodeToken(token)._id;
        console.log('token: ', token, '; encoded: ', id);
        
        

        User.findById(id)
    .then((foundUser) => {
      if (!foundUser) {
        throw new NotFoundError("Запрашиваемый пользователь не найден");
      }

      // tokens block start 
      maxAgeReAccess = 1000 * 60 * 1; //2 mintues    
      const accessToken = generateToken(
          { _id: foundUser._id.toString(), name: foundUser.name, email: foundUser.email },
          maxAgeReAccess); //Access
          maxAgeRefresh = 1000 * 60 * 60 * 24 * 2; // 2 days 
      const refreshToken = generateToken({ _id: foundUser._id }, maxAgeRefresh); //Refresh
      //tokens block end
      
      addTokensToUser(foundUser, accessToken, refreshToken, res, next);
    })
    .catch((err) => {
      next(err);
    });
       
      // should send success and new access and refresh token
    } catch (err) {
      return next(err);
    }
  };