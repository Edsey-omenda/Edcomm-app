import React from 'react'
import Address from './components/Address'
import { injectReducer } from '@/store'
import reducer from './store'

injectReducer('checkout', reducer)

const Checkout = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* <h1>Proceed to enter Billing address and Pay!</h1> */}
      <Address />
    </div>
  )
}

export default Checkout
