import WithHeaderFooterAside from '../Components/Hoc/WithHeaderFooterAside/WithHeaderFooterAside'
import Products from '../Components/Products/Products'

export default function Main () {
  const Main = WithHeaderFooterAside(Products)
  return <Main />
}
