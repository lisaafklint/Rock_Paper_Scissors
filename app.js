const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { v4: uuid } = require("uuid");

app.use(bodyParser.json());

let listOfIncompleteGames = [];

//POST to create a new game
//Requires the players name in the request
app.post("/newgame", (req, res) => {
  //generates an unique id for the game
  const gameId = uuid();
  const playerName = req.body.name;

  if (!playerName) {
    return res.status(400).send("Please include the name of the player");
  }

  const game = {
    gameId: gameId,
    playerOne: playerName,
    playerTwo: "",
    playerOneMove: "",
    playerTwoMove: "",
    game_completed: false,
  };

  listOfIncompleteGames.push(game);
  res
    .status(201)
    .send(`${playerName} Created a new game created with gameid: ${gameId}`);
});

//Get to list all incomplete games
app.get("/games", (req, res) => {
  res.status(201).send(listOfIncompleteGames);
});

//GET the state of a specific game
//Requires the gameid in the url
app.get("/games/:gameId/state", (req, res) => {
  const gameId = req.params.gameId;

  if (!gameId) {
    return res.status(400).send("Please enter the gameId into the url");
  }
  for (let game of listOfIncompleteGames) {
    if (game.gameId === gameId) {
      res.json(game);
      return;
    }
  }
  res.status(404).send(`Game with gameId ${gameId} not found`);
});

//add so check if another player can join
app.post("/games/:gameId/join", (req, res) => {
  const gameId = req.params.gameId;
  const playerName = req.body.name;

  if (!gameId) {
    return res.status(400).send("Enter gameId in the url");
  }
  if (!playerName) {
    return res.status(400).send("Please include the name of the player");
  }

  for (let game of listOfIncompleteGames) {
    if (game.gameId === gameId) {
      if (game.playerOne === playerName) {
        return res
          .status(400)
          .send("The names of the players cannot be identical");
      }
      game.playerTwo = playerName;
      res.json(game);
      return;
    }
  }
  return res.status(400).send("Game not found");
});

app.post("/games/:gameId/play", (req, res) => {
  const gameId = req.params.gameId;
  const playerName = req.body.name;
  const playerMove = req.body.move;

  const winningHand = {
    rock: "scissors",
    scissors: "paper",
    paper: "rock",
  };

  const result = {
    rockscissors: "rock crushes scissors",
    scissorspaper: "scissors cuts paper",
    paperrock: "paper covers rock",
  };

  if (!gameId) {
    return res.status(400).send("Enter gameId");
  }
  if (!playerMove || !playerName) {
    return res
      .status(400)
      .send("Enter name and move of the player that wish to play");
  }

  for (let game of listOfIncompleteGames) {
    if (game.gameId === gameId) {
      if (game.playerOne === playerName) {
        game.playerOneMove = playerMove;
      } else if (game.playerTwo === playerName) {
        game.playerTwoMove = playerMove;
      } else {
        return res.status(400).send("Name not found");
      }

      if (game.playerOneMove && game.playerTwoMove) {
        //both have played
        if (game.playerOneMove === game.playerTwoMove) {
          return res.send("Game Tied");
        }
        if (winningHand[game.playerOneMove] === game.playerTwoMove) {
          return res.send({
            winner: game.playerOne,
            result: result[game.playerOneMove + game.playerTwoMove],
          });
        } else {
          return res.send({
            winner: game.playerTwo,
            result: result[game.playerTwoMove + game.playerOneMove],
          });
        }
      } else {
        return res.status(201).send("player did a move");
      }
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
