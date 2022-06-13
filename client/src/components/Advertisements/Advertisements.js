import React from 'react'

import SampleAdBanner1 from "../../assets/images/sample-ad-1.jpg"
import SampleAdBanner2 from "../../assets/images/sample-ad-2.jpg"

function Advertisements() {
  return (
    <div className="card">
        <div className="card-header">Advertisements</div>
        <div className="card-body d-flex flex-column gap-3">
            <img src={SampleAdBanner2} alt="" />
            <img src={SampleAdBanner1} alt="" />
        </div>
    </div>
  )
}

export default Advertisements