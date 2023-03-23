# Rock_Paper_Scissors
## Description
A REST API that lets developers resolve their differences using the game Rock, Paper, Scissors. The rules are simple, the best of 1 match wins.

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
* <code> /games/:gameId/state </code> _replacing :gameId with the desired game ID_ : Get the state of a specific game. Dependant on the state of the game different attributes are shown. 

#### <code> POST </code> 
* <code>/newgame</code> : Creates a new game with the player's name in the request body. Example: { "name": "Adam" }. The game is given a game ID
* <code> /games/:gameId/join </code> _replacing :gameId with the ID of the game_ : Joins an existing game. Include the player's name in the request body. Example: { "name": "Anna" }.
* <code> /games/:gameId/play </code> _replacing :gameId with the ID of the game_. Plays the game as a player. Include the player's name and move in the request body. Example: { "name": "Adam", "move": "rock" }.


## Motivation of tech
#### NodeJs: 
Node.js is an open-source,proxy server-side JavaScript runtime environment for building web applications. NodeJs gives us access to: The node package manager (npm), wich provides access to hundreds of thousands of reusable packages. As a result, you won’t have to develop nearly as much code from scratch.
#### Express: 
Express is a fast and flexible web application framework for Node.js. It's a layer built on the top of the Node js that helps manage servers and routes. Express allows developers to create APIs quickly and easily.

Additionally it becomes easy to expand this project. If wanting to save the data, NodeJs and Express integrate well with various databases, including MongoDB, MySQL, and PostgreSQL. For NodeJs JavaScript is used for both front-end and back-end development, making the language more consistent across the entire application. This make it easy to imopplement a front-end to this project

#### body-parser: 
Body-parser is the Node.js body parsing middleware. It is responsible for parsing the incoming request bodies in a middleware before you handle it. Using body-parser allows you to access req.body from within routes and use that data.

#### uuid: 
Stands for Universally Unique Identifier (UUID). Ensures that every game has a unique identifier

### Improvements
Additional handling of input: This implementation has a limited handling of request input such as _name_ and _move_. While it ensures that a value is entered for name and that move is one of: _rock, paper, scissors_, it can be improved futher. Name could be restricted to only include letters or numbers, for example not allow users to use _?(}_ as a name. When getting the value of move, this value can be removed of whitespaces and set ot lowercase. In this implementation " rock", or "Rock" is not a valid input.  
