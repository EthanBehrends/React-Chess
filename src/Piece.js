import './Piece.css';

function getClass(piece) {
    switch (piece) {
        case 'P':
            return("white-pawn")
            break;
    
        case 'p':
            return("black-pawn")
            break;
            
        case 'R':
            return("white-rook")
            break;
    
        case 'r':
            return("black-rook")
            break;
            
        case 'N':
            return("white-knight")
            break;
    
        case 'n':
            return("black-knight")
            break;
            
        case 'B':
            return("white-bishop")
            break;
    
        case 'b':
            return("black-bishop")
            break;
            
        case 'K':
            return("white-king")
            break;
    
        case 'k':
            return("black-king")
            break;
            
        case 'Q':
            return("white-queen")
            break;
    
        case 'q':
            return("black-queen")
            break;
            
        
        default:
            return("white-pawn");
            break;
    }
}

function Piece(props) {

    return(
        <div className={"piece " + getClass(props.type)}></div>
    )
}

export default Piece;