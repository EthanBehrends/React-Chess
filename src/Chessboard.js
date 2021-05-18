import './Chessboard.css';
import Tile from './Tile.js';
import PieceTray from './PieceTray.js'
import {useState, useEffect} from 'react';

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

let capturedPieces = "";

let active = false;
let playerIsWhite = true;
let whitesTurn = true;
let isPieceSelected = false;
let pieceSelected;

let whiteKing = 'E1';
let blackKing = 'E8';


function pieceIsWhite(piece) {
    return (piece === piece.toUpperCase() && piece !== '.');
}

function charToInt(num) {
    return(String.fromCharCode(num + 64))
}

function keyToArray(key) {
    return([Number.parseInt(8- key.charAt(1)),key.charCodeAt(0) - 65])
}

function arrayToKey(array) {
    return charToInt(array[1] + 1) + (8-array[0])
}

function Chessboard(props) {
    useEffect(() => {
        if(props.socket !== undefined){
            props.socket.on("makeMove", data => {
                console.log(data);
                if (data.from !== props.socket.id) opponentMove(data.start, data.end);
            })
        }
        
    })

    function useForceUpdate(){
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => value + 1); // update the state to force render
    }

    function getKeysForColor(color, b =board) {
        let pieces = [];
        for(let i = 0; i<= 7; i++) {
            for (let j = 0; j <= 7; j++) {
                if(((color === 'white') === pieceIsWhite(getPiece(arrayToKey([i,j]),b))) && getPiece(arrayToKey([i,j]),b) !== '.') pieces.push(arrayToKey([i,j]));
            }
        }
        return pieces;
    }

    function pieceIsThreatened(key, b = board) {
        let enemyMoves = [];
        getKeysForColor(pieceIsWhite(getPiece(key,b)) ? 'black' : 'white',b).map(key => {enemyMoves.push(possibleMoves(key,b))});
        enemyMoves = enemyMoves.flat();
        return enemyMoves.includes(key);
    }

    function getPiece(key, b = board) {
        return (b[keyToArray(key)[0]][keyToArray(key)[1]]);
    }

    function checkForCheckmate(color) {
        let piece = (color === 'white' ? whiteKing : blackKing);
        if(pieceIsThreatened(piece)){
            let pseudoMoves = possibleMoves(piece);
            pseudoMoves = pseudoMoves.filter(move => testMove(piece,move,board));
            if(pseudoMoves.length === 0) return true;
        }
        return false;
    }

    function possibleMoves(key,board) {
        const piece = getPiece(key,board);
        const coords = keyToArray(key);
        let moves = [];
        switch (piece) {
            case 'P':
                if(coords[0] > 0 && getPiece(arrayToKey([coords[0]-1,coords[1]]),board) === '.') moves.push(arrayToKey([coords[0]-1,coords[1]]));
                if(coords[0] > 0 && coords[1] > 0 && !pieceIsWhite(getPiece(arrayToKey([coords[0]-1,coords[1]-1])),board) && getPiece(arrayToKey([coords[0]-1,coords[1]-1]),board) !== '.') moves.push(arrayToKey([coords[0]-1,coords[1]-1]));
                if(coords[0] > 0 && coords[1] < 7 && !pieceIsWhite(getPiece(arrayToKey([coords[0]-1,coords[1]+1]),board)) && getPiece(arrayToKey([coords[0]-1,coords[1]+1]),board) !== '.') moves.push(arrayToKey([coords[0]-1,coords[1]+1]));
                if(coords[0] === 6 && getPiece(arrayToKey([coords[0]-1,coords[1]]),board) === '.' && getPiece(arrayToKey([coords[0]-2,coords[1]]),board) === '.') moves.push(arrayToKey([coords[0]-2,coords[1]]));
                return moves;
                break;
        
            case 'p':
                if(coords[0] < 7 && getPiece(arrayToKey([coords[0]+1,coords[1]]),board) === '.') moves.push(arrayToKey([coords[0]+1,coords[1]]));
                if(coords[0] < 7 && coords[1] > 0 && pieceIsWhite(getPiece(arrayToKey([coords[0]+1,coords[1]-1]),board)) && getPiece(arrayToKey([coords[0]+1,coords[1]-1]),board) !== '.') moves.push(arrayToKey([coords[0]+1,coords[1]-1]));
                if(coords[0] < 7 && coords[1] < 7 && pieceIsWhite(getPiece(arrayToKey([coords[0]+1,coords[1]+1]),board)) && getPiece(arrayToKey([coords[0]+1,coords[1]+1]),board) !== '.') moves.push(arrayToKey([coords[0]+1,coords[1]+1]));
                if(coords[0] === 1 && getPiece(arrayToKey([coords[0]+1,coords[1]]),board) === '.' && getPiece(arrayToKey([coords[0]+2,coords[1]]),board) === '.') moves.push(arrayToKey([coords[0]+2,coords[1]]));
                return moves;
                break;
        
            case 'R':
                for(let i=coords[0]+1;i<=7;i++) {
                    if(getPiece(arrayToKey([i,coords[1]]),board) ==='.'){
                        moves.push(arrayToKey([i,coords[1]]));
                    }
                    else {
                        if(!pieceIsWhite(getPiece(arrayToKey([i,coords[1]])),board)) moves.push(arrayToKey([i,coords[1]]));
                        break;
                    }
                }
                for(let i=coords[0]-1;i>=0;i--) {
                    if(getPiece(arrayToKey([i,coords[1]]),board) ==='.'){
                        moves.push(arrayToKey([i,coords[1]]));
                    }
                    else {
                        if(!pieceIsWhite(getPiece(arrayToKey([i,coords[1]]),board))) moves.push(arrayToKey([i,coords[1]]));
                        break;
                    }
                }
                for(let i=coords[1]+1;i<=7;i++) {
                    if(getPiece(arrayToKey([coords[0],i]),board) ==='.'){
                        moves.push(arrayToKey([coords[0],i]));
                    }
                    else {
                        if(!pieceIsWhite(getPiece(arrayToKey([coords[0],i]),board))) moves.push(arrayToKey([coords[0],i]));
                        break;
                    }
                }
                for(let i=coords[1]-1;i>=0;i--) {
                    if(getPiece(arrayToKey([coords[0],i]),board) ==='.'){
                        moves.push(arrayToKey([coords[0],i]));
                    }
                    else {
                        if(!pieceIsWhite(getPiece(arrayToKey([coords[0],i]),board))) moves.push(arrayToKey([coords[0],i]));
                        break;
                    }
                }
                return moves;
            
            case 'r':
                for(let i=coords[0]+1;i<=7;i++) {
                    if(getPiece(arrayToKey([i,coords[1]]),board) ==='.'){
                        moves.push(arrayToKey([i,coords[1]]));
                    }
                    else {
                        if(pieceIsWhite(getPiece(arrayToKey([i,coords[1]]),board))) moves.push(arrayToKey([i,coords[1]]));
                        break;
                    }
                }
                for(let i=coords[0]-1;i>=0;i--) {
                        if(getPiece(arrayToKey([i,coords[1]]),board) ==='.'){
                            moves.push(arrayToKey([i,coords[1]]));
                        }
                        else {
                            if(pieceIsWhite(getPiece(arrayToKey([i,coords[1]]),board))) moves.push(arrayToKey([i,coords[1]]));
                            break;
                        }
                    }
                    for(let i=coords[1]+1;i<=7;i++) {
                        if(getPiece(arrayToKey([coords[0],i]),board) ==='.'){
                            moves.push(arrayToKey([coords[0],i]));
                        }
                        else {
                            if(pieceIsWhite(getPiece(arrayToKey([coords[0],i]),board))) moves.push(arrayToKey([coords[0],i]));
                            break;
                        }
                    }
                    for(let i=coords[1]-1;i>=0;i--) {
                        if(getPiece(arrayToKey([coords[0],i]),board) ==='.'){
                            moves.push(arrayToKey([coords[0],i]));
                        }
                        else {
                            if(pieceIsWhite(getPiece(arrayToKey([coords[0],i]),board))) moves.push(arrayToKey([coords[0],i]));
                            break;
                        }
                    }
                    return moves;
            
                case 'N':
                    if((coords[0] + 2 <= 7) && (coords[1] + 1 <= 7) && (!pieceIsWhite(getPiece(arrayToKey([coords[0] + 2, coords[1] + 1]),board)) || getPiece(arrayToKey([coords[0] + 2, coords[1] + 1]),board) === '.')) moves.push(arrayToKey([coords[0] + 2, coords[1] + 1]));
                    if((coords[0] + 2 <= 7) && (coords[1] - 1 >= 0) && (!pieceIsWhite(getPiece(arrayToKey([coords[0] + 2, coords[1] - 1]),board)) || getPiece(arrayToKey([coords[0] + 2, coords[1] - 1]),board) === '.')) moves.push(arrayToKey([coords[0] + 2, coords[1] - 1]));
                    if((coords[0] - 2 >= 0) && (coords[1] + 1 <= 7) && (!pieceIsWhite(getPiece(arrayToKey([coords[0] - 2, coords[1] + 1]),board)) || getPiece(arrayToKey([coords[0] - 2, coords[1] + 1]),board) === '.')) moves.push(arrayToKey([coords[0] - 2, coords[1] + 1]));
                    if((coords[0] - 2 >= 0) && (coords[1] - 1 >= 0) && (!pieceIsWhite(getPiece(arrayToKey([coords[0] - 2, coords[1] - 1]),board)) || getPiece(arrayToKey([coords[0] - 2, coords[1] - 1]),board) === '.')) moves.push(arrayToKey([coords[0] - 2, coords[1] - 1]));
                    if((coords[0] + 1 <= 7) && (coords[1] + 2 <= 7) && (!pieceIsWhite(getPiece(arrayToKey([coords[0] + 1, coords[1] + 2]),board)) || getPiece(arrayToKey([coords[0] + 1, coords[1] + 2]),board) === '.')) moves.push(arrayToKey([coords[0] + 1, coords[1] + 2]));
                    if((coords[0] + 1 <= 7) && (coords[1] - 2 >= 0) && (!pieceIsWhite(getPiece(arrayToKey([coords[0] + 1, coords[1] - 2]),board)) || getPiece(arrayToKey([coords[0] + 1, coords[1] - 2]),board) === '.')) moves.push(arrayToKey([coords[0] + 1, coords[1] - 2]));
                    if((coords[0] - 1 >= 0) && (coords[1] + 2 <= 7) && (!pieceIsWhite(getPiece(arrayToKey([coords[0] - 1, coords[1] + 2]),board)) || getPiece(arrayToKey([coords[0] - 1, coords[1] + 2]),board) === '.')) moves.push(arrayToKey([coords[0] - 1, coords[1] + 2]));
                    if((coords[0] - 1 >= 0) && (coords[1] - 2 >= 0) && (!pieceIsWhite(getPiece(arrayToKey([coords[0] - 1, coords[1] - 2]),board)) || getPiece(arrayToKey([coords[0] - 1, coords[1] - 2]),board) === '.')) moves.push(arrayToKey([coords[0] - 1, coords[1] - 2]));
                    return moves;

                case 'n':
                    if((coords[0] + 2 <= 7) && (coords[1] + 1 <= 7) && (pieceIsWhite(getPiece(arrayToKey([coords[0] + 2, coords[1] + 1]),board)) || getPiece(arrayToKey([coords[0] + 2, coords[1] + 1]),board) === '.')) moves.push(arrayToKey([coords[0] + 2, coords[1] + 1]));
                    if((coords[0] + 2 <= 7) && (coords[1] - 1 >= 0) && (pieceIsWhite(getPiece(arrayToKey([coords[0] + 2, coords[1] - 1]),board)) || getPiece(arrayToKey([coords[0] + 2, coords[1] - 1]),board) === '.')) moves.push(arrayToKey([coords[0] + 2, coords[1] - 1]));
                    if((coords[0] - 2 >= 0) && (coords[1] + 1 <= 7) && (pieceIsWhite(getPiece(arrayToKey([coords[0] - 2, coords[1] + 1]),board)) || getPiece(arrayToKey([coords[0] - 2, coords[1] + 1]),board) === '.')) moves.push(arrayToKey([coords[0] - 2, coords[1] + 1]));
                    if((coords[0] - 2 >= 0) && (coords[1] - 1 >= 0) && (pieceIsWhite(getPiece(arrayToKey([coords[0] - 2, coords[1] - 1]),board)) || getPiece(arrayToKey([coords[0] - 2, coords[1] - 1]),board) === '.')) moves.push(arrayToKey([coords[0] - 2, coords[1] - 1]));
                    if((coords[0] + 1 <= 7) && (coords[1] + 2 <= 7) && (pieceIsWhite(getPiece(arrayToKey([coords[0] + 1, coords[1] + 2]),board)) || getPiece(arrayToKey([coords[0] + 1, coords[1] + 2]),board) === '.')) moves.push(arrayToKey([coords[0] + 1, coords[1] + 2]));
                    if((coords[0] + 1 <= 7) && (coords[1] - 2 >= 0) && (pieceIsWhite(getPiece(arrayToKey([coords[0] + 1, coords[1] - 2]),board)) || getPiece(arrayToKey([coords[0] + 1, coords[1] - 2]),board) === '.')) moves.push(arrayToKey([coords[0] + 1, coords[1] - 2]));
                    if((coords[0] - 1 >= 0) && (coords[1] + 2 <= 7) && (pieceIsWhite(getPiece(arrayToKey([coords[0] - 1, coords[1] + 2]),board)) || getPiece(arrayToKey([coords[0] - 1, coords[1] + 2]),board) === '.')) moves.push(arrayToKey([coords[0] - 1, coords[1] + 2]));
                    if((coords[0] - 1 >= 0) && (coords[1] - 2 >= 0) && (pieceIsWhite(getPiece(arrayToKey([coords[0] - 1, coords[1] - 2]),board)) || getPiece(arrayToKey([coords[0] - 1, coords[1] - 2]),board) === '.')) moves.push(arrayToKey([coords[0] - 1, coords[1] - 2]));
                    return moves;

                case 'B':
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] + i <= 7 && coords[1] + i <= 7) {
                            if(getPiece(arrayToKey([coords[0]+i,coords[1]+i]),board) === '.') {
                                moves.push(arrayToKey([coords[0]+i,coords[1]+i]));
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]+i]),board))) {
                                break;
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]+i]),board))){
                                moves.push(arrayToKey([coords[0]+i,coords[1]+i]));
                                break;
                            }
                        }
                    }
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] + i <= 7 && coords[1] - i >= 0) {
                            if(getPiece(arrayToKey([coords[0]+i,coords[1]-i]),board) === '.') {
                                moves.push(arrayToKey([coords[0]+i,coords[1]-i]));
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]-i]),board))) {
                                break;
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]-i]),board))){
                                moves.push(arrayToKey([coords[0]+i,coords[1]-i]));
                                break;
                            }
                        }
                    }
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] - i >= 0 && coords[1] + i <= 7) {
                            if(getPiece(arrayToKey([coords[0]-i,coords[1]+i]),board) === '.') {
                                moves.push(arrayToKey([coords[0]-i,coords[1]+i]));
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]+i]),board))) {
                                break;
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]+i]),board))){
                                moves.push(arrayToKey([coords[0]-i,coords[1]+i]));
                                break;
                            }
                        }
                    }
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] - i >= 0 && coords[1] - i >= 0) {
                            if(getPiece(arrayToKey([coords[0]-i,coords[1]-i]),board) === '.') {
                                moves.push(arrayToKey([coords[0]-i,coords[1]-i]));
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]-i]),board))) {
                                break;
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]-i]),board))){
                                moves.push(arrayToKey([coords[0]-i,coords[1]-i]));
                                break;
                            }
                        }
                    }
                    return moves;

                case 'b':
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] + i <= 7 && coords[1] + i <= 7) {
                            if(getPiece(arrayToKey([coords[0]+i,coords[1]+i]),board) === '.') {
                                moves.push(arrayToKey([coords[0]+i,coords[1]+i]));
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]+i]),board))) {
                                break;
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]+i]),board))){
                                moves.push(arrayToKey([coords[0]+i,coords[1]+i]));
                                break;
                            }
                        }
                    }
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] + i <= 7 && coords[1] - i >= 0) {
                            if(getPiece(arrayToKey([coords[0]+i,coords[1]-i]),board) === '.') {
                                moves.push(arrayToKey([coords[0]+i,coords[1]-i]));
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]-i]),board))) {
                                break;
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]-i]),board))){
                                moves.push(arrayToKey([coords[0]+i,coords[1]-i]));
                                break;
                            }
                        }
                    }
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] - i >= 0 && coords[1] + i <= 7) {
                            if(getPiece(arrayToKey([coords[0]-i,coords[1]+i]),board) === '.') {
                                moves.push(arrayToKey([coords[0]-i,coords[1]+i]));
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]+i]),board))) {
                                break;
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]+i]),board))){
                                moves.push(arrayToKey([coords[0]-i,coords[1]+i]));
                                break;
                            }
                        }
                    }
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] - i >= 0 && coords[1] - i >= 0) {
                            if(getPiece(arrayToKey([coords[0]-i,coords[1]-i]),board) === '.') {
                                moves.push(arrayToKey([coords[0]-i,coords[1]-i]));
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]-i]),board))) {
                                break;
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]-i]),board))){
                                moves.push(arrayToKey([coords[0]-i,coords[1]-i]));
                                break;
                            }
                        }
                    }
                    return moves;
                
                case 'Q':
                    for(let i=coords[0]+1;i<=7;i++) {
                        if(getPiece(arrayToKey([i,coords[1]]),board) ==='.'){
                            moves.push(arrayToKey([i,coords[1]]));
                        }
                        else {
                            if(!pieceIsWhite(getPiece(arrayToKey([i,coords[1]]),board))) moves.push(arrayToKey([i,coords[1]]));
                            break;
                        }
                    }
                    for(let i=coords[0]-1;i>=0;i--) {
                        if(getPiece(arrayToKey([i,coords[1]]),board) ==='.'){
                            moves.push(arrayToKey([i,coords[1]]));
                        }
                        else {
                            if(!pieceIsWhite(getPiece(arrayToKey([i,coords[1]]),board))) moves.push(arrayToKey([i,coords[1]]));
                            break;
                        }
                    }
                    for(let i=coords[1]+1;i<=7;i++) {
                        if(getPiece(arrayToKey([coords[0],i]),board) ==='.'){
                            moves.push(arrayToKey([coords[0],i]));
                        }
                        else {
                            if(!pieceIsWhite(getPiece(arrayToKey([coords[0],i]),board))) moves.push(arrayToKey([coords[0],i]));
                            break;
                        }
                    }
                    for(let i=coords[1]-1;i>=0;i--) {
                        if(getPiece(arrayToKey([coords[0],i]),board) ==='.'){
                            moves.push(arrayToKey([coords[0],i]));
                        }
                        else {
                            if(!pieceIsWhite(getPiece(arrayToKey([coords[0],i]),board))) moves.push(arrayToKey([coords[0],i]));
                            break;
                        }
                    }
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] + i <= 7 && coords[1] + i <= 7) {
                            if(getPiece(arrayToKey([coords[0]+i,coords[1]+i]),board) === '.') {
                                moves.push(arrayToKey([coords[0]+i,coords[1]+i]));
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]+i]),board))) {
                                break;
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]+i]),board))){
                                moves.push(arrayToKey([coords[0]+i,coords[1]+i]));
                                break;
                            }
                        }
                    }
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] + i <= 7 && coords[1] - i >= 0) {
                            if(getPiece(arrayToKey([coords[0]+i,coords[1]-i]),board) === '.') {
                                moves.push(arrayToKey([coords[0]+i,coords[1]-i]));
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]-i]),board))) {
                                break;
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]-i]),board))){
                                moves.push(arrayToKey([coords[0]+i,coords[1]-i]));
                                break;
                            }
                        }
                    }
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] - i >= 0 && coords[1] + i <= 7) {
                            if(getPiece(arrayToKey([coords[0]-i,coords[1]+i]),board) === '.') {
                                moves.push(arrayToKey([coords[0]-i,coords[1]+i]));
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]+i]),board))) {
                                break;
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]+i]),board))){
                                moves.push(arrayToKey([coords[0]-i,coords[1]+i]));
                                break;
                            }
                        }
                    }
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] - i >= 0 && coords[1] - i >= 0) {
                            if(getPiece(arrayToKey([coords[0]-i,coords[1]-i]),board) === '.') {
                                moves.push(arrayToKey([coords[0]-i,coords[1]-i]));
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]-i]),board))) {
                                break;
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]-i]),board))){
                                moves.push(arrayToKey([coords[0]-i,coords[1]-i]));
                                break;
                            }
                        }
                    }
                    return moves;

                case 'q':
                    for(let i=coords[0]+1;i<=7;i++) {
                        if(getPiece(arrayToKey([i,coords[1]]),board) ==='.'){
                            moves.push(arrayToKey([i,coords[1]]));
                        }
                        else {
                            if(pieceIsWhite(getPiece(arrayToKey([i,coords[1]]),board))) moves.push(arrayToKey([i,coords[1]]));
                            break;
                        }
                    }
                    for(let i=coords[0]-1;i>=0;i--) {
                            if(getPiece(arrayToKey([i,coords[1]]),board) ==='.'){
                                moves.push(arrayToKey([i,coords[1]]));
                            }
                            else {
                                if(pieceIsWhite(getPiece(arrayToKey([i,coords[1]]),board))) moves.push(arrayToKey([i,coords[1]]));
                                break;
                            }
                        }
                        for(let i=coords[1]+1;i<=7;i++) {
                            if(getPiece(arrayToKey([coords[0],i]),board) ==='.'){
                                moves.push(arrayToKey([coords[0],i]));
                            }
                            else {
                                if(pieceIsWhite(getPiece(arrayToKey([coords[0],i]),board))) moves.push(arrayToKey([coords[0],i]));
                                break;
                            }
                        }
                        for(let i=coords[1]-1;i>=0;i--) {
                            if(getPiece(arrayToKey([coords[0],i]),board) ==='.'){
                                moves.push(arrayToKey([coords[0],i]));
                            }
                            else {
                                if(pieceIsWhite(getPiece(arrayToKey([coords[0],i]),board))) moves.push(arrayToKey([coords[0],i]));
                                break;
                            }
                        }
                        for(let i = 1; i <= 7; i++) {
                            if(coords[0] + i <= 7 && coords[1] + i <= 7) {
                                if(getPiece(arrayToKey([coords[0]+i,coords[1]+i]),board) === '.') {
                                    moves.push(arrayToKey([coords[0]+i,coords[1]+i]));
                                }
                                else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]+i]),board))) {
                                    break;
                                }
                                else if(pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]+i]),board))){
                                    moves.push(arrayToKey([coords[0]+i,coords[1]+i]));
                                    break;
                                }
                            }
                        }
                        for(let i = 1; i <= 7; i++) {
                            if(coords[0] + i <= 7 && coords[1] - i >= 0) {
                                if(getPiece(arrayToKey([coords[0]+i,coords[1]-i]),board) === '.') {
                                    moves.push(arrayToKey([coords[0]+i,coords[1]-i]));
                                }
                                else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]-i]),board))) {
                                    break;
                                }
                                else if(pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]-i]),board))){
                                    moves.push(arrayToKey([coords[0]+i,coords[1]-i]));
                                    break;
                                }
                            }
                        }
                        for(let i = 1; i <= 7; i++) {
                            if(coords[0] - i >= 0 && coords[1] + i <= 7) {
                                if(getPiece(arrayToKey([coords[0]-i,coords[1]+i]),board) === '.') {
                                    moves.push(arrayToKey([coords[0]-i,coords[1]+i]));
                                }
                                else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]+i]),board))) {
                                    break;
                                }
                                else if(pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]+i]),board))){
                                    moves.push(arrayToKey([coords[0]-i,coords[1]+i]));
                                    break;
                                }
                            }
                        }
                        for(let i = 1; i <= 7; i++) {
                            if(coords[0] - i >= 0 && coords[1] - i >= 0) {
                                if(getPiece(arrayToKey([coords[0]-i,coords[1]-i]),board) === '.') {
                                    moves.push(arrayToKey([coords[0]-i,coords[1]-i]));
                                }
                                else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]-i]),board))) {
                                    break;
                                }
                                else if(pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]-i]),board))){
                                    moves.push(arrayToKey([coords[0]-i,coords[1]-i]));
                                    break;
                                }
                            }
                        }
                        return moves;

                case 'K':
                    if(coords[0] - 1 >= 0) {
                        if(coords[1] - 1 >= 0) {
                            if(!pieceIsWhite(getPiece(arrayToKey([coords[0]-1,coords[1]-1]),board)) || getPiece(arrayToKey([coords[0]-1,coords[1]-1]),board) === '.') moves.push(arrayToKey([coords[0]-1,coords[1]-1]));
                        }
                        if(!pieceIsWhite(getPiece(arrayToKey([coords[0]-1,coords[1]]),board)) || getPiece(arrayToKey([coords[0]-1,coords[1]]),board) === '.') moves.push(arrayToKey([coords[0]-1,coords[1]]));
                        if(coords[1] + 1 <= 7) {
                            if(!pieceIsWhite(getPiece(arrayToKey([coords[0]-1,coords[1]+1]),board)) || getPiece(arrayToKey([coords[0]-1,coords[1]+1]),board) === '.') moves.push(arrayToKey([coords[0]-1,coords[1]+1]));
                        }
                    }
                    if(coords[0] + 1 <= 7) {
                        if(coords[1] - 1 >= 0) {
                            if(!pieceIsWhite(getPiece(arrayToKey([coords[0]+1,coords[1]-1]),board)) || getPiece(arrayToKey([coords[0]+1,coords[1]-1]),board) === '.') moves.push(arrayToKey([coords[0]+1,coords[1]-1]));
                        }
                        if(!pieceIsWhite(getPiece(arrayToKey([coords[0]+1,coords[1]]),board)) || getPiece(arrayToKey([coords[0]+1,coords[1]]),board) === '.') moves.push(arrayToKey([coords[0]+1,coords[1]]));
                        if(coords[1] + 1 <= 7) {
                            if(!pieceIsWhite(getPiece(arrayToKey([coords[0]+1,coords[1]+1]),board)) || getPiece(arrayToKey([coords[0]+1,coords[1]+1]),board) === '.') moves.push(arrayToKey([coords[0]+1,coords[1]+1]));
                        }
                    }
                    if(coords[1] - 1 >= 0) {
                        if(!pieceIsWhite(getPiece(arrayToKey([coords[0],coords[1]-1]),board)) || getPiece(arrayToKey([coords[0],coords[1]-1]),board) === '.') moves.push(arrayToKey([coords[0],coords[1]-1]));
                    }
                    if(coords[1] + 1 <= 7) {
                        if(!pieceIsWhite(getPiece(arrayToKey([coords[0],coords[1]+1]),board)) || getPiece(arrayToKey([coords[0],coords[1]+1]),board) === '.') moves.push(arrayToKey([coords[0],coords[1]+1]));
                    }

                    return moves;

                    case 'k':
                        if(coords[0] - 1 >= 0) {
                            if(coords[1] - 1 >= 0) {
                                if(pieceIsWhite(getPiece(arrayToKey([coords[0]-1,coords[1]-1]),board)) || getPiece(arrayToKey([coords[0]-1,coords[1]-1]),board) === '.') moves.push(arrayToKey([coords[0]-1,coords[1]-1]));
                            }
                            if(pieceIsWhite(getPiece(arrayToKey([coords[0]-1,coords[1]]),board)) || getPiece(arrayToKey([coords[0]-1,coords[1]]),board) === '.') moves.push(arrayToKey([coords[0]-1,coords[1]]));
                            if(coords[1] + 1 <= 7) {
                                if(pieceIsWhite(getPiece(arrayToKey([coords[0]-1,coords[1]+1]),board)) || getPiece(arrayToKey([coords[0]-1,coords[1]+1]),board) === '.') moves.push(arrayToKey([coords[0]-1,coords[1]+1]));
                            }
                        }
                        if(coords[0] + 1 <= 7) {
                            if(coords[1] - 1 >= 0) {
                                if(pieceIsWhite(getPiece(arrayToKey([coords[0]+1,coords[1]-1]),board)) || getPiece(arrayToKey([coords[0]+1,coords[1]-1]),board) === '.') moves.push(arrayToKey([coords[0]+1,coords[1]-1]));
                            }
                            if(pieceIsWhite(getPiece(arrayToKey([coords[0]+1,coords[1]]),board)) || getPiece(arrayToKey([coords[0]+1,coords[1]]),board) === '.') moves.push(arrayToKey([coords[0]+1,coords[1]]));
                            if(coords[1] + 1 <= 7) {
                                if(pieceIsWhite(getPiece(arrayToKey([coords[0]+1,coords[1]+1]),board)) || getPiece(arrayToKey([coords[0]+1,coords[1]+1]),board) === '.') moves.push(arrayToKey([coords[0]+1,coords[1]+1]));
                            }
                        }
                        if(coords[1] - 1 >= 0) {
                            if(pieceIsWhite(getPiece(arrayToKey([coords[0],coords[1]-1]),board)) || getPiece(arrayToKey([coords[0],coords[1]-1]),board) === '.') moves.push(arrayToKey([coords[0],coords[1]-1]));
                        }
                        if(coords[1] + 1 <= 7) {
                            if(pieceIsWhite(getPiece(arrayToKey([coords[0],coords[1]+1]),board)) || getPiece(arrayToKey([coords[0],coords[1]+1]),board) === '.') moves.push(arrayToKey([coords[0],coords[1]+1]));
                        }
                        return moves;

                default:
                return moves;
                break;
        }

    }

    function move(iCoord, fCoord) {
        let tempboard = board;
        if(getPiece(iCoord) === 'K') whiteKing = fCoord;
        if(getPiece(iCoord) === 'k') blackKing = fCoord;
        if(getPiece(fCoord) !== '.') capturedPieces += (getPiece(fCoord));
        tempboard[keyToArray(fCoord)[0]][keyToArray(fCoord)[1]] = tempboard[keyToArray(iCoord)[0]][keyToArray(iCoord)[1]];
        tempboard[keyToArray(iCoord)[0]][keyToArray(iCoord)[1]] = '.';
        setBoard(tempboard);
        props.socket.emit('move', {from: props.socket.id, start: iCoord, end: fCoord});
        forceUpdate();
        whitesTurn = !whitesTurn;
    }

    function opponentMove(iCoord, fCoord) {
        if(getPiece(iCoord) === '.') return;
        let tempboard = board;
        if(getPiece(iCoord) === 'K') whiteKing = fCoord;
        if(getPiece(iCoord) === 'k') blackKing = fCoord;
        if(getPiece(fCoord) !== '.') capturedPieces += (getPiece(fCoord));
        tempboard[keyToArray(fCoord)[0]][keyToArray(fCoord)[1]] = tempboard[keyToArray(iCoord)[0]][keyToArray(iCoord)[1]];
        tempboard[keyToArray(iCoord)[0]][keyToArray(iCoord)[1]] = '.';
        setBoard(tempboard);
        forceUpdate();
        whitesTurn = !whitesTurn;
    }

    function testMove(iCoord, fCoord, b) {
        let testBoard = JSON.parse(JSON.stringify(b));
        let moveIsWhite = pieceIsWhite(getPiece(iCoord));
        let testKing = (moveIsWhite ? whiteKing : blackKing);
        if(getPiece(iCoord) === (moveIsWhite ? 'K' : 'k')) testKing = fCoord;
        testBoard[keyToArray(fCoord)[0]][keyToArray(fCoord)[1]] = testBoard[keyToArray(iCoord)[0]][keyToArray(iCoord)[1]];
        testBoard[keyToArray(iCoord)[0]][keyToArray(iCoord)[1]] = '.';
        return !pieceIsThreatened(testKing, testBoard);
    }

    const [curPossibleMoves,setPossibleMoves] = useState([]);
    let select = (coord) => {
        if(active && (!isPieceSelected || curPossibleMoves.length === 0)) {
            let isWhite = pieceIsWhite(getPiece(coord));
            if(getPiece(coord) === '.' || isWhite !== whitesTurn) return;
            isPieceSelected = true;
            pieceSelected = coord;
            let pseudoMoves = possibleMoves(coord);
            pseudoMoves = pseudoMoves.filter(move => testMove(coord,move,board));
            setPossibleMoves(pseudoMoves);
        }
        else {
            if(curPossibleMoves.includes(coord)){
                move(pieceSelected, coord);
                if (checkForCheckmate(pieceIsWhite(pieceSelected) ? 'black' : 'white')) endGame(pieceIsWhite(pieceSelected) ? 'white' : 'black');
            }
            isPieceSelected = false;
            setPossibleMoves([])
        }
    }

    function endGame(winner) {
        alert("Checkmate, " + winner + " wins.");
    }

    const forceUpdate = useForceUpdate();

    const [board, setBoard] = useState(defaultBoard);
    const [whitePOV, setWhitePOV] = useState(true);

    return(
        <div id="field" >
            <PieceTray side="top" pieces ={capturedPieces} color={whitePOV ? 'white' : 'black'} />
            <div id="board" className={whitePOV ? 'white' : 'black'}>
                {
                    board.map((row, i) => {
                        return(row.map((cell, j) => {
                            return(<Tile 
                                key={charToInt(8-i) + (j+1)} 
                                label={charToInt(8-i) + (j+1)} 
                                piece={board[7-j][7-i]} 
                                moveable={curPossibleMoves !== [] && curPossibleMoves.includes(charToInt(8-i) + (j+1))}
                                color={(i + j) % 2 === 1 ? 'dark' : 'light'}
                                select={select}
                                ></Tile>);
                        }))
                    })
                }
            </div>
            <div id="POVFlip" onClick={() => {setWhitePOV(!whitePOV)}}></div>
            <PieceTray side="bottom" pieces={capturedPieces} color={whitePOV ? 'black' : 'white'} />
        </div>
    )
}

export default Chessboard;