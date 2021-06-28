import './TurnMarker.css'

function TurnMarker(props) {
    return (
        <div id="tMarker">
            <p class="turnText">{props.isActive ? (props.isTurn ? "Your Turn" : "Opponents Turn") : "React Chess"}</p>
        </div>
    )
    
}

export default TurnMarker;