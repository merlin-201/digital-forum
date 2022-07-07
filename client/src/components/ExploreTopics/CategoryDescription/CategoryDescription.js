import React from 'react'

import { getImage } from '../../../services/image';

const CategoryDescription = ( {category} ) => {
  return (
    <div className="row">

        <div className="col-sm-auto col-12 mb-sm-0 mb-2 d-flex justify-content-center">
        <img src={category.thumbnail ? getImage(category.thumbnail) : getImage('default-category.jpg')} className="category-thumbnail" alt="" />
        </div>

        <div className="col d-flex align-items-end p-0">
        <div className="row">
            <div className="col-sm-auto col-12 d-flex justify-content-center">
            <h3 className="text-brand-blue fw-bold">{category?.name}</h3>
            </div>
            <div className="col-12 text-sm-start text-center">
            <span className="text-muted">{category?.description}</span>
            </div>
        </div>
        </div>
    </div>
  )
}

export default CategoryDescription