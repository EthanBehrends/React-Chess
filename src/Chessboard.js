import './Chessboard.css';
import Tile from './Tile.js';
import {useState} from 'react';

const defaultBoard = [
    ['r','n','b','q','k','b','n','r'],
    ['p','p','p','p','p','p','p','p'],
    ['.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.'],
    ['P','P','P','P','P','P','P','P'],
    ['R','N','B','Q','K','B','N','R']
]

function charToInt(num) {
    return(String.fromCharCode(num + 64))
}

function keyToArray(key) {
    return([Number.parseInt(8- key.charAt(1)),key.charCodeAt(0) - 65])
}

function Chessboard() {
    function useForceUpdate(){
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => value + 1); // update the state to force render
    }


    function getPiece(key) {
        console.log(keyToArray(key)[0] + " " + keyToArray(key)[1]);
        return (board[keyToArray(key)[0]][keyToArray(key)[1]]);
    }

    function possibleMoves(key) {
        const piece = getPiece(key);
        const white = piece === piece.toUpperCase();
        let moves = [];

    }

    function move(iCoord, fCoord) {
        let tempboard = board;
        tempboard[keyToArray(fCoord)[0]][keyToArray(fCoord)[1]] = tempboard[keyToArray(iCoord)[0]][keyToArray(iCoord)[1]];
        tempboard[keyToArray(iCoord)[0]][keyToArray(iCoord)[1]] = '.';
        setBoard(tempboard);
        forceUpdate();
    }

    const forceUpdate = useForceUpdate();

    const [board, setBoard] = useState(defaultBoard);
    const [whitePOV, setWhitePOV] = useState(true);

    return(
        <div id="board" className={whitePOV ? 'white' : 'black'}>
            {
                board.map((row, i) => {
                    return(row.map((cell, j) => {
                        return(<Tile key={charToInt(8-i) + (j+1)} label={charToInt(8-i) + (j+1)} piece={board[7-j][7-i]} color={(i + j) % 2 === 1 ? 'dark' : 'light'}></Tile>);
                    }))
                })
            }
            <div id="POVFlip" onClick={() => {setWhitePOV(!whitePOV)}}></div>
            <div id="testButton" onClick={() => {move('A1', 'F4')}}></div>
        </div>
    )
}

function Grid(props) {
    return (
        props.board.map((row, i) => {
            return(row.map((cell, j) => {
                return(<Tile key={charToInt(8-i) + (j+1)} label={charToInt(8-i) + (j+1)} piece={props.board[7-j][7-i]} color={(i + j) % 2 === 1 ? 'dark' : 'light'}></Tile>);
            }))
        })
    )
}

export default Chessboard;