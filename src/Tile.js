import './Tile.css'
import { useState } from 'react'


function Tile(props) {
    const [selected, setSelected] = useState(false);
    
    return (
        <div onClick={() => {setSelected(!selected)}}className={'tile ' + props.color + ' ' + (selected ? 'selected' : '')}>
            {props.content !== '.' ? props.content : ""}
        </div>
    )
}

export default Tile;