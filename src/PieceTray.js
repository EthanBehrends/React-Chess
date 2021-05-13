import './PieceTray.css'
import Piece from './Piece.js'

function pieceValue(p) {
    switch(p) {
        case 'p':
        case 'P':
            return(1);
        case 'r':
        case 'R':
            return(5);
        case 'b':
        case 'B':
        case 'n':
        case 'N':
            return(3);
        case 'q':
        case 'Q':
            return(9);
        default:
            return(0);
            break;
    }
}

export default function PieceTray(props) {
    
    function pieceMatches(piece) {
        return (props.color === 'white' ? piece === piece.toUpperCase() : piece !== piece.toUpperCase()) && piece !== "";
    }

    function parsePieces (p) {
        let pieces = p.split('');
        return(
            pieces.filter(q => pieceMatches(q)).sort((a,b)=> {
                return(pieceValue(a) - pieceValue(b));
            }).map((piece,i) => {
                return(
                    <div key={i *2} className="pieceCont">
                        <Piece key={i} type={piece} />
                    </div>
                )
            })
        )
    }

    function getScore(p) {
        const pieces = p.split('');
        const score = pieces.filter(p => pieceMatches(p)).map(p => pieceValue(p)).reduce((a,b) => a+b, 0) - pieces.filter(p => !pieceMatches(p)).map(p => pieceValue(p)).reduce((a,b) => a+b, 0);
        if( score > 0) return ("+" + score);
    }

    return (
        <div className={"tray " + props.side}>
            {parsePieces(props.pieces)}
            <div className="score">
                {getScore(props.pieces)}
            </div>
        </div>
    )
}