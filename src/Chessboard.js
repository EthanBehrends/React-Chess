import './Chessboard.css';
import Tile from './Tile.js';
import {useState} from 'react';

let board = [
    ['r','k','b','K','Q','b','k','r'],
    ['p','p','p','p','p','p','p','p'],
    ['.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.'],
    ['p','p','p','p','p','p','p','p'],
    ['r','k','b','Q','K','b','k','r']
]

function charToInt(num) {
    return(String.fromCharCode(num + 64))
}

function keyToArray(key) {

}

function possibleMoves(coords) {

}

function move(iCoord, fCoord) {

}

function Chessboard() {
    const [whitePOV, setWhitePOV] = useState(true);

    return(
        <div id="board" className={whitePOV ? 'white' : 'black'}>
            {board.map((row, i) => {
                return(row.map((cell, j) => {
                    return(<Tile key={charToInt(j+1) +(8-i)} content={charToInt(j+1) + (8-i)} color={(i + j) % 2 === 1 ? 'dark' : 'light'}></Tile>);
                }))
            })}
            <div id="POVFlip" onClick={() => {setWhitePOV(!whitePOV)}}></div>
        </div>
    )
}

export default Chessboard;