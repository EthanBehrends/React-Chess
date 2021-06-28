import './AboutPanel.css'
import {useState} from 'react'

function AboutPanel(props) {
    const [isOut, setIsOut] = useState(false);

    return(
        <div id="panelWrapper" className={isOut ? "" : "notOut"}>
            <div id="panelTab" onClick={()=>setIsOut(!isOut)}>
                !
            </div>
            <div id="panelBody">
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida tortor nunc, at pulvinar dui hendrerit eget. Donec luctus ex eget sem vestibulum porttitor. Duis rhoncus lorem odio, ac varius urna dapibus eu. Aliquam vitae sem condimentum, pellentesque diam in, dictum erat. Duis finibus mi ut justo consectetur, vitae consequat orci maximus. Donec posuere, justo quis egestas porta, ante turpis ornare sapien, ut volutpat diam nulla in odio. Quisque varius, ante quis porttitor lacinia, mauris magna malesuada metus, aliquet congue mauris sem in neque. Sed eget justo lorem. Curabitur sollicitudin sodales bibendum.
                </p>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida tortor nunc, at pulvinar dui hendrerit eget. Donec luctus ex eget sem vestibulum porttitor. Duis rhoncus lorem odio, ac varius urna dapibus eu. Aliquam vitae sem condimentum, pellentesque diam in, dictum erat. Duis finibus mi ut justo consectetur, vitae consequat orci maximus. Donec posuere, justo quis egestas porta, ante turpis ornare sapien, ut volutpat diam nulla in odio. Quisque varius, ante quis porttitor lacinia, mauris magna malesuada metus, aliquet congue mauris sem in neque. Sed eget justo lorem. Curabitur sollicitudin sodales bibendum.
                </p>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida tortor nunc, at pulvinar dui hendrerit eget. Donec luctus ex eget sem vestibulum porttitor. Duis rhoncus lorem odio, ac varius urna dapibus eu. Aliquam vitae sem condimentum, pellentesque diam in, dictum erat. Duis finibus mi ut justo consectetur, vitae consequat orci maximus. Donec posuere, justo quis egestas porta, ante turpis ornare sapien, ut volutpat diam nulla in odio. Quisque varius, ante quis porttitor lacinia, mauris magna malesuada metus, aliquet congue mauris sem in neque. Sed eget justo lorem. Curabitur sollicitudin sodales bibendum.
                </p>
            </div>
        </div>
    )
}

export default AboutPanel;