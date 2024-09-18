import React from 'react'
import RelatedProducts from '../RelatedProducts/RelatedProducts'

const FeaturedProducts = () => {
  return (
    <div className='mt-20 mb-24 px-10 hidden sm:block bg-slate-50 py-10'>
        <h2 className="text-3xl ml-10 font-bold">Featured Products</h2>
        <RelatedProducts/>
    </div>
  )
}

export default FeaturedProducts