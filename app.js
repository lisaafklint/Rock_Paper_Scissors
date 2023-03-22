const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { v4: uuid } = require("uuid");

let games = [];

app.use(bodyParser.json());

app.post("/games", (req, res) => {
  const gameId = uuid(); //generates an id for the game
  const playerName = req.body.name;

  if (!playerName) {
    return res.sendStatus(400);
  }

  const game = {
    gameId: gameId,
    playerOne: playerName,
    playerTwo: "",
    state: "uncompleated",
  };
  games.push(game);

  res.status(201).json({
    gameId: gameId,
    playerName: playerName,
  });
});

app.get("/games/:gameId", (req, res) => {
  const gameId = req.params.gameId;

  console.log(gameId);

  if (!gameId) {
    return res.status(400).send("Enter gameId");
  }
  for (let game of games) {
    if (game.gameId === gameId) {
      res.json(game);
      return;
    }
  }
  res.status(404).send("Game not found");
});

//add so check if another player can join
app.post("/games/:gameId/join", (req, res) => {
  const gameId = req.params.gameId;
  const playerName = req.body.name;

  if (!gameId) {
    return res.status(400).send("Enter gameId");
  }

  for (let game of games) {
    if (game.gameId === gameId) {
      game.playerTwo = playerName;
      res.json(game);
      return;
    }
  }
});

app.post("/games/:gameId/play", (req, res) => {
  const gameId = req.params.gameId;
  var playerOne = "";
  var playerTwo = "";

  const playerOneHand = req.body.playerOneHand;
  const playerTwoHand = req.body.playerTwoHand;

  if (!gameId) {
    return res.status(400).send("Enter gameId");
  }

  for (let game of games) {
    if (game.gameId === gameId) {
      playerOne = game.playerOne;
      playerTwo = game.playerTwo;
    }
  }

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

  if (!playerOneHand || !playerTwoHand) {
    return res.status(400).send("Please provide both players hand choice");
  }

  if (playerOneHand === playerTwoHand) {
    return res.send("Game Tied");
  }

  if (winningHand[playerOneHand] === playerTwoHand) {
    return res.send({
      winner: playerOne,
      result: result[playerOneHand + playerTwoHand],
    });
  } else {
    return res.send({
      winner: playerTwo,
      result: result[playerTwoHand + playerOneHand],
    });
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});
