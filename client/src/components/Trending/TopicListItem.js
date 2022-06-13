import React from 'react'

import BitcoinLogo from "../../assets/images/bitcoin.png"

import "./Trending.css"

function TopicListItem() {
  return (
    <li className="list-group-item">
        <img alt="" src={BitcoinLogo} className="rounded-circle" width="35" data-toggle="title"/>
        <span className="d-inline-block mx-2">Bitcoin</span>
    </li>
  )
}

export default TopicListItem