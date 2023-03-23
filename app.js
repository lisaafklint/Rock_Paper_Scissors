const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { v4: uuid } = require("uuid");

app.use(bodyParser.json());

let listOfGames = [];

const allowedMoves = ["rock", "paper", "scissors"];

const winningMove = {
  rock: "scissors",
  scissors: "paper",
  paper: "rock",
};

const result = {
  rockscissors: "rock crushes scissors",
  scissorspaper: "scissors cuts paper",
  paperrock: "paper covers rock",
};

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
    game_status: "Uncompleted",
    game_result: "",
  };

  listOfGames.push(game);
  res.status(201).json({
    message: `${playerName} created a new game`,
    gameId: gameId,
  });
});

//Get to list all games
app.get("/games", (req, res) => {
  res.status(201).json(listOfGames);
});

//GET the state of a specific game
//Requires a given gameId
app.get("/games/:gameId/state", (req, res) => {
  const gameId = req.params.gameId;

  if (!gameId) {
    return res.status(400).json({
      status: "Missing gameId",
      message: "Please enter the gameId",
    });
  }
  for (let game of listOfGames) {
    if (game.gameId === gameId) {
      if (game.game_result) {
        return res.status(201).json({
          message: `Game with gameId ${gameId} found`,
          data: {
            gameId: gameId,
            playerOne: game.playerOne,
            playerTwo: game.playerTwo,
            game_result: game.game_result,
          },
        });
      }
      return res.status(201).json({
        message: `Game with gameId ${gameId} found`,
        data: {
          gameId: gameId,
          playerOne: game.playerOne,
          playerTwo: game.playerTwo,
          game_status: game.game_status,
        },
      });
    }
  }
  res.status(404).json({
    status: "Game not found",
    message: `Game with gameId ${gameId} not found`,
  });
});

//POST Joins an existing game
//Requires a given gameId and name of player to join
app.post("/games/:gameId/join", (req, res) => {
  const gameId = req.params.gameId;
  const playerName = req.body.name;

  if (!gameId) {
    return res.status(400).json({
      status: "Missing gameId",
      message: "Please enter the gameId",
    });
  }
  if (!playerName) {
    return res.status(400).json({
      status: "Missing player name",
      message:
        "Please enter the name of the player that wants to join in the request",
    });
  }

  for (let game of listOfGames) {
    if (game.gameId === gameId) {
      if (game.playerOne === playerName) {
        return res.status(400).json({
          status: "Identical player names",
          message: "The names of the players cannot be identical",
        });
      }
      if (game.playerTwo) {
        return res.status(400).json({
          status: "Game full",
          message: "This game has reached its maximum number of players",
        });
      }
      game.playerTwo = playerName;
      return res.status(201).json({
        message: `Player ${playerName} has joined the game wih gameID ${gameId}`,
      });
    }
  }
  return res.status(400).json({
    status: "Game not found",
    message: `Game with gameId ${gameId} not found`,
  });
});

//POST play the game
//Requires a given gameId and the name and move of a player in the request
app.post("/games/:gameId/play", (req, res) => {
  const gameId = req.params.gameId;
  const playerName = req.body.name;
  const playerMove = req.body.move;

  if (!gameId) {
    return res.status(400).json({
      status: "Missing gameId",
      message: "Please enter the gameId",
    });
  }
  if (!playerName || !playerMove) {
    return res.status(400).json({
      status: "Missing info",
      message:
        "Please enter the name and move of the player that wants to play in the request",
    });
  }

  if (!allowedMoves.includes(playerMove)) {
    return res.status(400).json({
      status: "Illegal move",
      message: "Please enter a move that is either rock, paper or scissors",
    });
  }

  for (let game of listOfGames) {
    if (game.gameId === gameId) {
      if (game.playerOne === playerName) {
        game.playerOneMove = playerMove;
        game.game_status = "playing";
      } else if (game.playerTwo === playerName) {
        game.playerTwoMove = playerMove;
        game.game_status = "playing";
      } else {
        return res.status(400).json({
          status: "Name not found",
          message:
            "The name sent in does not match any of the names of the player for the game with the given id",
        });
      }

      if (game.playerOneMove && game.playerTwoMove) {
        game.game_status = "Game completed";
        if (game.playerOneMove === game.playerTwoMove) {
          game.game_result = "Game tied";
          return res.status(201).json({
            message: "Game tied",
          });
        }
        if (winningMove[game.playerOneMove] === game.playerTwoMove) {
          var gameResult = result[game.playerOneMove + game.playerTwoMove];
          game.game_result = `Winner ${game.playerOne}: ${gameResult}`;
          return res.status(201).json({
            action: `${playerName} played ${playerMove}`,
            winner: game.playerOne,
            result: `${gameResult}`,
          });
        } else {
          var gameResult = result[game.playerTwoMove + game.playerOneMove];
          game.game_result = `Winner ${game.playerTwo}: ${gameResult}`;
          return res.send({
            action: `${playerName} played ${playerMove}`,
            winner: game.playerTwo,
            result: `${gameResult}`,
          });
        }
      } else {
        return res.status(201).json(`${playerName} played ${playerMove}`);
      }
    }
  }
  return res.status(400).json({
    status: "Game not found",
    message: `Game with gameId ${gameId} not found`,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
