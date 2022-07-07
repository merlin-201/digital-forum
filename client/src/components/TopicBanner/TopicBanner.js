import React from 'react'

import { getImage } from '../../services/image'

const hexToRGB = (hex) => {
    if( hex === null ){
        return null
    }
    else{
        return {
            red : '0x' + hex[1] + hex[2] | 0,
            green :  '0x' + hex[3] + hex[4] | 0,
            blue : '0x' + hex[5] + hex[6] | 0
        };
    }
}

function TopicBanner({topic}) {

    // conditionally styling the topic banner color :
    let themeColorRGB = hexToRGB(topic.theme_color);
    const BANNER_OPACITY = 0.2;
    let style={
        backgroundColor : themeColorRGB ? `rgba(${themeColorRGB.red}, ${themeColorRGB.green}, ${themeColorRGB.blue}, ${BANNER_OPACITY})` : '#eeeeee'
    }

    return (
        <div className="card d-flex flex-row pt-4 pb-2 px-4" style={style}>
            <div className="topic-logo">
                <img src={topic.thumbnail ? getImage(topic.thumbnail) : getImage('default-topic.jpg')} className="rounded-circle" width="120px" alt="" />
            </div>
            <div className="info d-flex flex-column ms-4 mb-3 justify-content-end">
                <h1 className='fw-bold'>{topic.name}</h1>
                <span className="fs-6 fw-bold">101K Followers</span>
            </div>
        </div>
    )
}

export default TopicBanner