import './AboutPanel.css'
import {useState} from 'react'
import { ArrowBack } from '@material-ui/icons'

function AboutPanel(props) {
    const [isOut, setIsOut] = useState(false);

    return(
        <div id="panelWrapper" className={isOut ? "" : "notOut"}>
            <div id="panelTab" onClick={()=>setIsOut(!isOut)}>
                <ArrowBack className={isOut ? "rotate" : ""} />
            </div>
            <div id="panelBody">
                {props.children}
            </div>
        </div>
    )
}

export default AboutPanel;