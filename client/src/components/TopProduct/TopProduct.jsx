import React from 'react'
import RelatedProducts from '../RelatedProducts/RelatedProducts'

const TopProduct = () => {
  return (
    <div className='mt-5 mb-24 px-10 py-10 bg-gray-50'>
        <h2 className="text-3xl ml-10 font-bold">Top Product</h2>
        <RelatedProducts/>
    </div>
  )
}

export default TopProduct