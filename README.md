# Rock_Paper_Scissors
## Description
Enter description

## Getting started

### Installation
1. clone this repository to your local machine
2. igate to the cloned directory
3.  <code> npm install </code> 

### Start the REST API server
Start the server by running <code> npm start </code>
The server is now running on [http://localhost:3000](http://localhost:3000)

### Dependencies
* express
* body-parser
* uuid


### Using the REST API
You can access the REST API of the server using the following endpoints:

#### <code> GET </code> 
* <code> /games </code> : Lists all games
* <code> /games/:gameId/state </code> _replacing :gameId with the desired game ID_ : Get the state of a specific game

#### <code> POST </code> 
* <code>/newgame</code> : Creates a new game with the player's name in the request body. Example: { "name": "Adam" }. The game is given a game ID
* <code> /games/:gameId/join </code> _replacing :gameId with the ID of the game_ : Joins an existing game. Include the player's name in the request body. Example: { "name": "Anna" }.
* <code> /games/:gameId/play </code> _replacing :gameId with the ID of the game_. Plays the game as a player. Include the player's name and move in the request body. Example: { "name": "Adam", "move": "rock" }.


## Motivation of tech
