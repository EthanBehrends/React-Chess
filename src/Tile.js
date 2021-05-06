import './Tile.css'
import { useState } from 'react'
import Piece from './Piece.js'


function Tile(props) {
    const [selected, setSelected] = useState(false);

    return (
        <div onClick={() => {setSelected(!selected)}}className={'tile ' + props.color + ' ' + (selected ? 'selected' : '')}>
            {props.piece !== '.' ? <Piece type={props.piece} />: ""}
            <div className="label">{props.label}</div>
        </div>
    )
}

export default Tile;