import NewArrivals from '../components/products/NewArrivals'
import Hero from '../components/layout/Hero'
import GenCollection from '../components/products/GenCollection'
import React from 'react'

function Home() {
  return (
    <div>
      <Hero/>
      <GenCollection/>
      <NewArrivals/>
    </div>
  )
}

export default Home
