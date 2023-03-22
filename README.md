# Rock_Paper_Scissors
##Description
Eenter description

## Getting started

### Installation
1. clone this repository to your local machine
2. igate to the cloned directory
3.  <code> npm install </code> 

### Dependencies
* express
* body-parser
* uuid


### Executing program
1. Start the server by running <code> npm start </code>
2. To create a new game, make a POST request to /newgame with the player's name in the request body. Example: { "name": "Adam" }. The game is given a game ID
3. To list all games, make a GET request to /games
4. To get the state of a specific game, make a GET request to /games/:gameId/state, replacing :gameId with the desired game ID.
5. To join an existing game, make a POST request to /games/:gameId/join, replacing :gameId with the ID of the game. Include the player's name in the request body. Example: { "name": "Anna" }.
6. To play the game as a player, make a POST request to /games/:gameId/play, replacing :gameId with the ID of the game. Include the player's name and move in the request body. Example: { "name": "Adam", "move": "rock" }.

