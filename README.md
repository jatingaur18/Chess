# Chess Website

This project is a simple chess website built using React. It includes a chessboard component that allows users to play chess by making moves with the pieces. The chess logic is implemented to validate legal moves and determine check conditions.

## Table of Contents
- [Project Structure](#project-structure)
- [Chessboard Component](#chessboard-component)
- [Tile Component](#tile-component)
- [Chess Logic](#chess-logic)
- [How to Run](#how-to-run)

## Project Structure

The project consists of the following files and directories:

- `src/`
  - `components/`
    - `chessboard/` - Contains the Chessboard component.
    - `tile/` - Contains the Tile component.
  - `App.js` - Main component rendering Chessboard.
  - `chessboard.css` - Stylesheet for the Chessboard component.
  - `App.css` - Stylesheet for the App component.
  - `Tile.css` - Stylesheet for the Tile component.

## Chessboard Component

The Chessboard component (`Chessboard.js`) is the main component responsible for rendering the chessboard, handling user interactions, and managing the game state. It uses the Tile component to render each square on the board.

## Tile Component

The Tile component (`Tile.js`) is a simple component used to render each square on the chessboard. It displays a piece image if a piece is present on the square, and it handles the visual representation of empty squares.

## Chess Logic

The chess logic is implemented in the Chessboard component. It includes functions for updating the board based on user moves, checking for legal moves, and determining check conditions. The logic for different types of pieces (pawn, knight, rook, bishop, queen, and king) is implemented in separate functions.

## How to Run

To run the chess website locally, follow these steps:

1. Clone the repository: `git clone https://github.com/jatingaur18/Chess.git`
2. Navigate to the project directory: `cd chess-website`
3. Install dependencies: `npm install`
4. Run the application: `npm start`

The chess website should open in your default web browser. You can start playing chess by making moves on the chessboard.

Feel free to customize and extend the project as needed. Enjoy playing chess on the website!