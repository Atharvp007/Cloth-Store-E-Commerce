import NewArrivals from '../components/products/NewArrivals'
import Hero from '../components/layout/Hero'
import GenCollection from '../components/products/GenCollection'
import React from 'react'
import ProductDetails from '../components/products/ProductDetails'
import Featured from '../components/products/Featured'
import Features from '../components/products/Features'

function Home() {
  return (
    <div>
      <Hero/>
      <GenCollection/>
      <NewArrivals/>

      <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
      <ProductDetails/>
      <Featured/>
      <Features/>
    </div>
  )
}

export default Home
