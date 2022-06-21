import React from 'react'

import { Category } from "../../../assets/images";

const CategoryDescription = () => {
  return (
    <div className="row">

        <div className="col-sm-auto col-12 mb-sm-0 mb-2 d-flex justify-content-center">
        <img src={Category} className="category-thumbnail" alt="" />
        </div>

        <div className="col d-flex align-items-end p-0">
        <div className="row">
            <div className="col-sm-auto col-12 d-flex justify-content-center">
            <h3 className="text-brand-blue fw-bold">Crytocurrency</h3>
            </div>
            <div className="col-12 text-sm-start text-center">
            <span className="text-muted">A category to discuss trading strategies on trending cryptocurrencies.</span>
            </div>
        </div>
        </div>
    </div>
  )
}

export default CategoryDescription