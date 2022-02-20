var Game = require('../orchestrator');
/**
 * Poker Endpoints
 */

exports.getUserId = (existingUserData) => {
  console.log("Made it here: ", existingUserData);
  if (existingUserData){
    return 1;
  } else {
    return 0;
  }
}

exports.joinGame = async (req, h) => {
  console.log(req.payload);
  const { firstName, lastName, gameId } = req.payload;
  if (!firstName || !lastName || !gameId) {
      console.log("Missing firstname, lastname, or gameId");
      // return internals.renderHtml.login('Missing firstname, lastname, or gameId');
  }

  // Try to find user with given credentials

  // const account = internals.users.find(
  //     (user) => user.name === username && user.password === password
  // );

  // if (!account) {
  //     return internals.renderHtml.login('Invalid username or password');
  // }

  req.cookieAuth.set({ id: 100 });
  return h.redirect('/game');
};

exports.newGame = async (req, h) => {
  console.log(req.payload);
  const { firstName, lastName } = req.payload;
  if (!firstName || !lastName ) {
      console.log("Missing firstname or lastname");
      // return internals.renderHtml.login('Missing firstname, lastname, or gameId');
  }
  req.cookieAuth.set({ id: 101 });
  return h.redirect('/game');
};

exports.createPlayer = (req, h) => {
  return {status: 'success', data: Game.createPlayer(req.payload.firstname, req.payload.lastname)};
};

exports.addPlayer = (req, h) => {
  return {status: 'success', players: Game.addPlayerToGame(req.query.gameId, req.query.playerId)};
};

exports.new = (req, h) => {
  return {status: 'success', gameId: Game.newGame(Game.gameConfig)};
};

exports.bet = (req, h) => {
    return {status: 'success', data: Game.receiveAction('bet', req.query.amount)};
};

exports.call = (req, h) => {
  return {status: 'success', data: Game.receiveAction('call')};
};

exports.check = (req, h) => {
  return {status: 'success', data: Game.receiveAction('check')};
};

exports.fold = (req, h) => {
  return {status: 'success', data: Game.receiveAction('fold')};
};

exports.nextHand = (req, h) => {
  return {status: 'success', data: Game.nextHand(req.query.gameId)};
};

// /**
//  * Get Dog by ID
//  */
// exports.get = (req, h) => {

//   return Dog.findById(req.params.id).exec().then((dog) => {

//     if(!dog) return { message: 'Dog not Found' };

//     return { dog: dog };

//   }).catch((err) => {

//     return { err: err };

//   });
// }


// /**
//  * POST a Dog
//  */
// exports.create = (req, h) => {

//   const dogData = {
//     name: req.payload.name,
//     breed: req.payload.breed,
//     age: req.payload.age,
//     image: req.payload.image
//   };

//   return Dog.create(dogData).then((dog) => {

//      return { message: "Dog created successfully", dog: dog };

//   }).catch((err) => {

//     return { err: err };

//   });
// }

// /**
//  * PUT | Update Dog by ID
//  */
// exports.update = (req, h) => {

//   return Dog.findById(req.params.id).exec().then((dog) => {

//     if (!dog) return { err: 'Dog not found' };

//     dog.name = req.payload.name;
//     dog.breed = req.payload.breed;
//     dog.age = req.payload.age;
//     dog.image = req.payload.image;

//     dog.save(dogData);

//   }).then((data) => {

//       return { message: "Dog data updated successfully" };

//   }).catch((err) => {

//       return { err: err };

//   });
// }

// /**
//  * Delete Dog by ID
//  */
// exports.remove = (req, h) => {

//   return Dog.findById(req.params.id).exec(function (err, dog) {

//     if (err) return { dberror: err };
//     if (!dog) return { message: 'Dog not found' };

//     dog.remove(function (err) {
//       if (err) return { dberror: err };

//       return { success: true };
//     });
//   });
// }