import './Tile.css'
import { useState } from 'react'
import Piece from './Piece.js'


function Tile(props) {

    return (
        <div onClick={() => props.select(props.label)} className={'tile ' + props.color}>
            {props.threatened ? <div className="threatened"></div> :""}
            {props.piece !== '.' ? <Piece type={props.piece} />: ""}
            <div className="label">{props.label}</div>
            {props.moveable ? <div className="moveable"></div> :""}
        </div>
    )
}

export default Tile;