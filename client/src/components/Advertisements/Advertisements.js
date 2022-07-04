import React from 'react'
import { useSelector } from 'react-redux'

import { getAdBanner } from '../../services/image';

function Advertisements() {

	const advertisements = useSelector( state => state.advertisements );

	let adElements = advertisements.map( (ad) => (
		<a href={ad.target_url} key={ad.id} target="blank">
			<img src={getAdBanner(ad.banner)} alt="" style={ { width : "100%"} }/>
		</a>
		
	));

	return (
		<div className="card">
			<div className="card-header">Advertisements</div>
			<div className="card-body d-flex flex-column gap-3">
				{adElements}
			</div>
		</div>
	)

}

export default Advertisements