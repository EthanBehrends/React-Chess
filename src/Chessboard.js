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

let playerIsWhite = true;

let isPieceSelected = false;
let pieceSelected;


function pieceIsWhite(piece) {
    return piece === piece.toUpperCase();
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

function Chessboard() {
    function useForceUpdate(){
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => value + 1); // update the state to force render
    }


    function getPiece(key) {
        return (board[keyToArray(key)[0]][keyToArray(key)[1]]);
    }

    function possibleMoves(key) {
        const piece = getPiece(key);
        const coords = keyToArray(key);
        let moves = [];
        switch (piece) {
            case 'P':
                if(coords[0] > 0 && getPiece(arrayToKey([coords[0]-1,coords[1]])) === '.') moves.push(arrayToKey([coords[0]-1,coords[1]]));
                if(coords[0] > 0 && coords[1] > 0 && !pieceIsWhite(getPiece(arrayToKey([coords[0]-1,coords[1]-1]))) && getPiece(arrayToKey([coords[0]-1,coords[1]-1])) !== '.') moves.push(arrayToKey([coords[0]-1,coords[1]-1]));
                if(coords[0] > 0 && coords[1] < 7 && !pieceIsWhite(getPiece(arrayToKey([coords[0]-1,coords[1]+1]))) && getPiece(arrayToKey([coords[0]-1,coords[1]+1])) !== '.') moves.push(arrayToKey([coords[0]-1,coords[1]+1]));
                if(coords[0] === 6 && getPiece(arrayToKey([coords[0]-1,coords[1]])) === '.' && getPiece(arrayToKey([coords[0]-2,coords[1]])) === '.') moves.push(arrayToKey([coords[0]-2,coords[1]]));
                return moves;
                break;
        
            case 'p':
                if(coords[0] < 7 && getPiece(arrayToKey([coords[0]+1,coords[1]])) === '.') moves.push(arrayToKey([coords[0]+1,coords[1]]));
                if(coords[0] < 7 && coords[1] > 0 && pieceIsWhite(getPiece(arrayToKey([coords[0]+1,coords[1]-1]))) && getPiece(arrayToKey([coords[0]+1,coords[1]-1])) !== '.') moves.push(arrayToKey([coords[0]+1,coords[1]-1]));
                if(coords[0] < 7 && coords[1] < 7 && pieceIsWhite(getPiece(arrayToKey([coords[0]+1,coords[1]+1]))) && getPiece(arrayToKey([coords[0]+1,coords[1]+1])) !== '.') moves.push(arrayToKey([coords[0]+1,coords[1]+1]));
                if(coords[0] === 1 && getPiece(arrayToKey([coords[0]+1,coords[1]])) === '.' && getPiece(arrayToKey([coords[0]+2,coords[1]])) === '.') moves.push(arrayToKey([coords[0]+2,coords[1]]));
                return moves;
                break;
        
            case 'R':
                for(let i=coords[0]+1;i<=7;i++) {
                    if(getPiece(arrayToKey([i,coords[1]])) ==='.'){
                        moves.push(arrayToKey([i,coords[1]]));
                    }
                    else {
                        if(!pieceIsWhite(getPiece(arrayToKey([i,coords[1]])))) moves.push(arrayToKey([i,coords[1]]));
                        break;
                    }
                }
                for(let i=coords[0]-1;i>=0;i--) {
                    if(getPiece(arrayToKey([i,coords[1]])) ==='.'){
                        moves.push(arrayToKey([i,coords[1]]));
                    }
                    else {
                        if(!pieceIsWhite(getPiece(arrayToKey([i,coords[1]])))) moves.push(arrayToKey([i,coords[1]]));
                        break;
                    }
                }
                for(let i=coords[1]+1;i<=7;i++) {
                    if(getPiece(arrayToKey([coords[0],i])) ==='.'){
                        moves.push(arrayToKey([coords[0],i]));
                    }
                    else {
                        if(!pieceIsWhite(getPiece(arrayToKey([coords[0],i])))) moves.push(arrayToKey([coords[0],i]));
                        break;
                    }
                }
                for(let i=coords[1]-1;i>=0;i--) {
                    if(getPiece(arrayToKey([coords[0],i])) ==='.'){
                        moves.push(arrayToKey([coords[0],i]));
                    }
                    else {
                        if(!pieceIsWhite(getPiece(arrayToKey([coords[0],i])))) moves.push(arrayToKey([coords[0],i]));
                        break;
                    }
                }
                return moves;
            
            case 'r':
                for(let i=coords[0]+1;i<=7;i++) {
                    if(getPiece(arrayToKey([i,coords[1]])) ==='.'){
                        moves.push(arrayToKey([i,coords[1]]));
                    }
                    else {
                        if(pieceIsWhite(getPiece(arrayToKey([i,coords[1]])))) moves.push(arrayToKey([i,coords[1]]));
                        break;
                    }
                }
                for(let i=coords[0]-1;i>=0;i--) {
                        if(getPiece(arrayToKey([i,coords[1]])) ==='.'){
                            moves.push(arrayToKey([i,coords[1]]));
                        }
                        else {
                            if(pieceIsWhite(getPiece(arrayToKey([i,coords[1]])))) moves.push(arrayToKey([i,coords[1]]));
                            break;
                        }
                    }
                    for(let i=coords[1]+1;i<=7;i++) {
                        if(getPiece(arrayToKey([coords[0],i])) ==='.'){
                            moves.push(arrayToKey([coords[0],i]));
                        }
                        else {
                            if(pieceIsWhite(getPiece(arrayToKey([coords[0],i])))) moves.push(arrayToKey([coords[0],i]));
                            break;
                        }
                    }
                    for(let i=coords[1]-1;i>=0;i--) {
                        if(getPiece(arrayToKey([coords[0],i])) ==='.'){
                            moves.push(arrayToKey([coords[0],i]));
                        }
                        else {
                            if(pieceIsWhite(getPiece(arrayToKey([coords[0],i])))) moves.push(arrayToKey([coords[0],i]));
                            break;
                        }
                    }
                    return moves;
            
                case 'N':
                    if((coords[0] + 2 <= 7) && (coords[1] + 1 <= 7) && (!pieceIsWhite(getPiece(arrayToKey([coords[0] + 2, coords[1] + 1]))) || getPiece(arrayToKey([coords[0] + 2, coords[1] + 1])) === '.')) moves.push(arrayToKey([coords[0] + 2, coords[1] + 1]));
                    if((coords[0] + 2 <= 7) && (coords[1] - 1 >= 0) && (!pieceIsWhite(getPiece(arrayToKey([coords[0] + 2, coords[1] - 1]))) || getPiece(arrayToKey([coords[0] + 2, coords[1] - 1])) === '.')) moves.push(arrayToKey([coords[0] + 2, coords[1] - 1]));
                    if((coords[0] - 2 >= 0) && (coords[1] + 1 <= 7) && (!pieceIsWhite(getPiece(arrayToKey([coords[0] - 2, coords[1] + 1]))) || getPiece(arrayToKey([coords[0] - 2, coords[1] + 1])) === '.')) moves.push(arrayToKey([coords[0] - 2, coords[1] + 1]));
                    if((coords[0] - 2 >= 0) && (coords[1] - 1 >= 0) && (!pieceIsWhite(getPiece(arrayToKey([coords[0] - 2, coords[1] - 1]))) || getPiece(arrayToKey([coords[0] - 2, coords[1] - 1])) === '.')) moves.push(arrayToKey([coords[0] - 2, coords[1] - 1]));
                    if((coords[0] + 1 <= 7) && (coords[1] + 2 <= 7) && (!pieceIsWhite(getPiece(arrayToKey([coords[0] + 1, coords[1] + 2]))) || getPiece(arrayToKey([coords[0] + 1, coords[1] + 2])) === '.')) moves.push(arrayToKey([coords[0] + 1, coords[1] + 2]));
                    if((coords[0] + 1 <= 7) && (coords[1] - 2 >= 0) && (!pieceIsWhite(getPiece(arrayToKey([coords[0] + 1, coords[1] - 2]))) || getPiece(arrayToKey([coords[0] + 1, coords[1] - 2])) === '.')) moves.push(arrayToKey([coords[0] + 1, coords[1] - 2]));
                    if((coords[0] - 1 >= 0) && (coords[1] + 2 <= 7) && (!pieceIsWhite(getPiece(arrayToKey([coords[0] - 1, coords[1] + 2]))) || getPiece(arrayToKey([coords[0] - 1, coords[1] + 2])) === '.')) moves.push(arrayToKey([coords[0] - 1, coords[1] + 2]));
                    if((coords[0] - 1 >= 0) && (coords[1] - 2 >= 0) && (!pieceIsWhite(getPiece(arrayToKey([coords[0] - 1, coords[1] - 2]))) || getPiece(arrayToKey([coords[0] - 1, coords[1] - 2])) === '.')) moves.push(arrayToKey([coords[0] - 1, coords[1] - 2]));
                    return moves;

                case 'n':
                    if((coords[0] + 2 <= 7) && (coords[1] + 1 <= 7) && (pieceIsWhite(getPiece(arrayToKey([coords[0] + 2, coords[1] + 1]))) || getPiece(arrayToKey([coords[0] + 2, coords[1] + 1])) === '.')) moves.push(arrayToKey([coords[0] + 2, coords[1] + 1]));
                    if((coords[0] + 2 <= 7) && (coords[1] - 1 >= 0) && (pieceIsWhite(getPiece(arrayToKey([coords[0] + 2, coords[1] - 1]))) || getPiece(arrayToKey([coords[0] + 2, coords[1] - 1])) === '.')) moves.push(arrayToKey([coords[0] + 2, coords[1] - 1]));
                    if((coords[0] - 2 >= 0) && (coords[1] + 1 <= 7) && (pieceIsWhite(getPiece(arrayToKey([coords[0] - 2, coords[1] + 1]))) || getPiece(arrayToKey([coords[0] - 2, coords[1] + 1])) === '.')) moves.push(arrayToKey([coords[0] - 2, coords[1] + 1]));
                    if((coords[0] - 2 >= 0) && (coords[1] - 1 >= 0) && (pieceIsWhite(getPiece(arrayToKey([coords[0] - 2, coords[1] - 1]))) || getPiece(arrayToKey([coords[0] - 2, coords[1] - 1])) === '.')) moves.push(arrayToKey([coords[0] - 2, coords[1] - 1]));
                    if((coords[0] + 1 <= 7) && (coords[1] + 2 <= 7) && (pieceIsWhite(getPiece(arrayToKey([coords[0] + 1, coords[1] + 2]))) || getPiece(arrayToKey([coords[0] + 1, coords[1] + 2])) === '.')) moves.push(arrayToKey([coords[0] + 1, coords[1] + 2]));
                    if((coords[0] + 1 <= 7) && (coords[1] - 2 >= 0) && (pieceIsWhite(getPiece(arrayToKey([coords[0] + 1, coords[1] - 2]))) || getPiece(arrayToKey([coords[0] + 1, coords[1] - 2])) === '.')) moves.push(arrayToKey([coords[0] + 1, coords[1] - 2]));
                    if((coords[0] - 1 >= 0) && (coords[1] + 2 <= 7) && (pieceIsWhite(getPiece(arrayToKey([coords[0] - 1, coords[1] + 2]))) || getPiece(arrayToKey([coords[0] - 1, coords[1] + 2])) === '.')) moves.push(arrayToKey([coords[0] - 1, coords[1] + 2]));
                    if((coords[0] - 1 >= 0) && (coords[1] - 2 >= 0) && (pieceIsWhite(getPiece(arrayToKey([coords[0] - 1, coords[1] - 2]))) || getPiece(arrayToKey([coords[0] - 1, coords[1] - 2])) === '.')) moves.push(arrayToKey([coords[0] - 1, coords[1] - 2]));
                    return moves;

                case 'B':
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] + i <= 7 && coords[1] + i <= 7) {
                            if(getPiece(arrayToKey([coords[0]+i,coords[1]+i])) === '.') {
                                moves.push(arrayToKey([coords[0]+i,coords[1]+i]));
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]+i])))) {
                                break;
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]+i])))){
                                moves.push(arrayToKey([coords[0]+i,coords[1]+i]));
                                break;
                            }
                        }
                    }
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] + i <= 7 && coords[1] - i >= 0) {
                            if(getPiece(arrayToKey([coords[0]+i,coords[1]-i])) === '.') {
                                moves.push(arrayToKey([coords[0]+i,coords[1]-i]));
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]-i])))) {
                                break;
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]-i])))){
                                moves.push(arrayToKey([coords[0]+i,coords[1]-i]));
                                break;
                            }
                        }
                    }
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] - i >= 0 && coords[1] + i <= 7) {
                            if(getPiece(arrayToKey([coords[0]-i,coords[1]+i])) === '.') {
                                moves.push(arrayToKey([coords[0]-i,coords[1]+i]));
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]+i])))) {
                                break;
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]+i])))){
                                moves.push(arrayToKey([coords[0]-i,coords[1]+i]));
                                break;
                            }
                        }
                    }
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] - i >= 0 && coords[1] - i >= 0) {
                            if(getPiece(arrayToKey([coords[0]-i,coords[1]-i])) === '.') {
                                moves.push(arrayToKey([coords[0]-i,coords[1]-i]));
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]-i])))) {
                                break;
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]-i])))){
                                moves.push(arrayToKey([coords[0]-i,coords[1]-i]));
                                break;
                            }
                        }
                    }
                    return moves;

                case 'b':
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] + i <= 7 && coords[1] + i <= 7) {
                            if(getPiece(arrayToKey([coords[0]+i,coords[1]+i])) === '.') {
                                moves.push(arrayToKey([coords[0]+i,coords[1]+i]));
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]+i])))) {
                                break;
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]+i])))){
                                moves.push(arrayToKey([coords[0]+i,coords[1]+i]));
                                break;
                            }
                        }
                    }
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] + i <= 7 && coords[1] - i >= 0) {
                            if(getPiece(arrayToKey([coords[0]+i,coords[1]-i])) === '.') {
                                moves.push(arrayToKey([coords[0]+i,coords[1]-i]));
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]-i])))) {
                                break;
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]-i])))){
                                moves.push(arrayToKey([coords[0]+i,coords[1]-i]));
                                break;
                            }
                        }
                    }
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] - i >= 0 && coords[1] + i <= 7) {
                            if(getPiece(arrayToKey([coords[0]-i,coords[1]+i])) === '.') {
                                moves.push(arrayToKey([coords[0]-i,coords[1]+i]));
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]+i])))) {
                                break;
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]+i])))){
                                moves.push(arrayToKey([coords[0]-i,coords[1]+i]));
                                break;
                            }
                        }
                    }
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] - i >= 0 && coords[1] - i >= 0) {
                            if(getPiece(arrayToKey([coords[0]-i,coords[1]-i])) === '.') {
                                moves.push(arrayToKey([coords[0]-i,coords[1]-i]));
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]-i])))) {
                                break;
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]-i])))){
                                moves.push(arrayToKey([coords[0]-i,coords[1]-i]));
                                break;
                            }
                        }
                    }
                    return moves;
                
                case 'Q':
                    for(let i=coords[0]+1;i<=7;i++) {
                        if(getPiece(arrayToKey([i,coords[1]])) ==='.'){
                            moves.push(arrayToKey([i,coords[1]]));
                        }
                        else {
                            if(!pieceIsWhite(getPiece(arrayToKey([i,coords[1]])))) moves.push(arrayToKey([i,coords[1]]));
                            break;
                        }
                    }
                    for(let i=coords[0]-1;i>=0;i--) {
                        if(getPiece(arrayToKey([i,coords[1]])) ==='.'){
                            moves.push(arrayToKey([i,coords[1]]));
                        }
                        else {
                            if(!pieceIsWhite(getPiece(arrayToKey([i,coords[1]])))) moves.push(arrayToKey([i,coords[1]]));
                            break;
                        }
                    }
                    for(let i=coords[1]+1;i<=7;i++) {
                        if(getPiece(arrayToKey([coords[0],i])) ==='.'){
                            moves.push(arrayToKey([coords[0],i]));
                        }
                        else {
                            if(!pieceIsWhite(getPiece(arrayToKey([coords[0],i])))) moves.push(arrayToKey([coords[0],i]));
                            break;
                        }
                    }
                    for(let i=coords[1]-1;i>=0;i--) {
                        if(getPiece(arrayToKey([coords[0],i])) ==='.'){
                            moves.push(arrayToKey([coords[0],i]));
                        }
                        else {
                            if(!pieceIsWhite(getPiece(arrayToKey([coords[0],i])))) moves.push(arrayToKey([coords[0],i]));
                            break;
                        }
                    }
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] + i <= 7 && coords[1] + i <= 7) {
                            if(getPiece(arrayToKey([coords[0]+i,coords[1]+i])) === '.') {
                                moves.push(arrayToKey([coords[0]+i,coords[1]+i]));
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]+i])))) {
                                break;
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]+i])))){
                                moves.push(arrayToKey([coords[0]+i,coords[1]+i]));
                                break;
                            }
                        }
                    }
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] + i <= 7 && coords[1] - i >= 0) {
                            if(getPiece(arrayToKey([coords[0]+i,coords[1]-i])) === '.') {
                                moves.push(arrayToKey([coords[0]+i,coords[1]-i]));
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]-i])))) {
                                break;
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]-i])))){
                                moves.push(arrayToKey([coords[0]+i,coords[1]-i]));
                                break;
                            }
                        }
                    }
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] - i >= 0 && coords[1] + i <= 7) {
                            if(getPiece(arrayToKey([coords[0]-i,coords[1]+i])) === '.') {
                                moves.push(arrayToKey([coords[0]-i,coords[1]+i]));
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]+i])))) {
                                break;
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]+i])))){
                                moves.push(arrayToKey([coords[0]-i,coords[1]+i]));
                                break;
                            }
                        }
                    }
                    for(let i = 1; i <= 7; i++) {
                        if(coords[0] - i >= 0 && coords[1] - i >= 0) {
                            if(getPiece(arrayToKey([coords[0]-i,coords[1]-i])) === '.') {
                                moves.push(arrayToKey([coords[0]-i,coords[1]-i]));
                            }
                            else if(pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]-i])))) {
                                break;
                            }
                            else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]-i])))){
                                moves.push(arrayToKey([coords[0]-i,coords[1]-i]));
                                break;
                            }
                        }
                    }
                    return moves;

                case 'q':
                    for(let i=coords[0]+1;i<=7;i++) {
                        if(getPiece(arrayToKey([i,coords[1]])) ==='.'){
                            moves.push(arrayToKey([i,coords[1]]));
                        }
                        else {
                            if(pieceIsWhite(getPiece(arrayToKey([i,coords[1]])))) moves.push(arrayToKey([i,coords[1]]));
                            break;
                        }
                    }
                    for(let i=coords[0]-1;i>=0;i--) {
                            if(getPiece(arrayToKey([i,coords[1]])) ==='.'){
                                moves.push(arrayToKey([i,coords[1]]));
                            }
                            else {
                                if(pieceIsWhite(getPiece(arrayToKey([i,coords[1]])))) moves.push(arrayToKey([i,coords[1]]));
                                break;
                            }
                        }
                        for(let i=coords[1]+1;i<=7;i++) {
                            if(getPiece(arrayToKey([coords[0],i])) ==='.'){
                                moves.push(arrayToKey([coords[0],i]));
                            }
                            else {
                                if(pieceIsWhite(getPiece(arrayToKey([coords[0],i])))) moves.push(arrayToKey([coords[0],i]));
                                break;
                            }
                        }
                        for(let i=coords[1]-1;i>=0;i--) {
                            if(getPiece(arrayToKey([coords[0],i])) ==='.'){
                                moves.push(arrayToKey([coords[0],i]));
                            }
                            else {
                                if(pieceIsWhite(getPiece(arrayToKey([coords[0],i])))) moves.push(arrayToKey([coords[0],i]));
                                break;
                            }
                        }
                        for(let i = 1; i <= 7; i++) {
                            if(coords[0] + i <= 7 && coords[1] + i <= 7) {
                                if(getPiece(arrayToKey([coords[0]+i,coords[1]+i])) === '.') {
                                    moves.push(arrayToKey([coords[0]+i,coords[1]+i]));
                                }
                                else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]+i])))) {
                                    break;
                                }
                                else if(pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]+i])))){
                                    moves.push(arrayToKey([coords[0]+i,coords[1]+i]));
                                    break;
                                }
                            }
                        }
                        for(let i = 1; i <= 7; i++) {
                            if(coords[0] + i <= 7 && coords[1] - i >= 0) {
                                if(getPiece(arrayToKey([coords[0]+i,coords[1]-i])) === '.') {
                                    moves.push(arrayToKey([coords[0]+i,coords[1]-i]));
                                }
                                else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]-i])))) {
                                    break;
                                }
                                else if(pieceIsWhite(getPiece(arrayToKey([coords[0]+i,coords[1]-i])))){
                                    moves.push(arrayToKey([coords[0]+i,coords[1]-i]));
                                    break;
                                }
                            }
                        }
                        for(let i = 1; i <= 7; i++) {
                            if(coords[0] - i >= 0 && coords[1] + i <= 7) {
                                if(getPiece(arrayToKey([coords[0]-i,coords[1]+i])) === '.') {
                                    moves.push(arrayToKey([coords[0]-i,coords[1]+i]));
                                }
                                else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]+i])))) {
                                    break;
                                }
                                else if(pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]+i])))){
                                    moves.push(arrayToKey([coords[0]-i,coords[1]+i]));
                                    break;
                                }
                            }
                        }
                        for(let i = 1; i <= 7; i++) {
                            if(coords[0] - i >= 0 && coords[1] - i >= 0) {
                                if(getPiece(arrayToKey([coords[0]-i,coords[1]-i])) === '.') {
                                    moves.push(arrayToKey([coords[0]-i,coords[1]-i]));
                                }
                                else if(!pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]-i])))) {
                                    break;
                                }
                                else if(pieceIsWhite(getPiece(arrayToKey([coords[0]-i,coords[1]-i])))){
                                    moves.push(arrayToKey([coords[0]-i,coords[1]-i]));
                                    break;
                                }
                            }
                        }
                        return moves;
                default:
                return moves;
                break;
        }

    }

    function move(iCoord, fCoord) {
        let tempboard = board;
        tempboard[keyToArray(fCoord)[0]][keyToArray(fCoord)[1]] = tempboard[keyToArray(iCoord)[0]][keyToArray(iCoord)[1]];
        tempboard[keyToArray(iCoord)[0]][keyToArray(iCoord)[1]] = '.';
        setBoard(tempboard);
        forceUpdate();
    }

    const [curPossibleMoves,setPossibleMoves] = useState([]);
    let select = (coord) => {
        if(!isPieceSelected) {
            if(getPiece(coord) === '.') return;
            isPieceSelected = true;
            pieceSelected = coord;
            setPossibleMoves(possibleMoves(coord));
        }
        else {
            if(curPossibleMoves.includes(coord)){
                move(pieceSelected, coord);
            }
            isPieceSelected = false;
            setPossibleMoves([])
        }
    }

    const forceUpdate = useForceUpdate();

    const [board, setBoard] = useState(defaultBoard);
    const [whitePOV, setWhitePOV] = useState(true);

    return(
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