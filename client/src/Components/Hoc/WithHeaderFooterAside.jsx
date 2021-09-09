import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Aside from '../Aside/Aside'
const WithHeaderFooterAside = Component => props => (
  <>
    <Header />
    <Aside />
    <Component {...props} />
    <Footer />
  </>
)

export default WithHeaderFooterAside
