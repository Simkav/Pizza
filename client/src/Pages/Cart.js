import CartPage from '../Components/CartPage/CartPage'
import WithHeaderFooterAside from '../Components/Hoc/WithHeaderFooterAside/WithHeaderFooterAside'

export default function Cart () {
  const Cart = WithHeaderFooterAside(CartPage)
  return <Cart />
}
