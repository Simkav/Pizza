import { FaCartPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import cl from './ProductFooter.module.css'
import { cartActionAdd, cartActionUpdate } from '../../../Actions/actionCreator'

export default function ProductFooter ({ item, isHovered }) {
  const dispatch = useDispatch()
  const cart = useSelector(({ cart }) => cart.cartItems)

  const handleCount = id => {
    const isExist = cart.find(item => item.id)
    if (isExist) {
      const result = cart.map(v =>
        v.id === id && v.hasOwnProperty('count')
          ? { ...v, count: v.count++ }
          : v
      )
      console.log(result, 'exist')
      dispatch(cartActionUpdate(result))
    } else {
      const newCartItem = { id: id, count: 1 }
      console.log(newCartItem)
      dispatch(cartActionAdd({...newCartItem}))
    }
  }

  return (
    <div className={cl.product_footer}>
      <span className={cl.product_price}>Цена: {item.price}</span>
      <span className={cl.product_weight}>Вес: {item.weight}</span>
      {isHovered ? (
        <div className={cl.cart_order_button_container}>
          <div className={cl.cart_order_button} onClick={() => handleCount(item.id)}>
            <FaCartPlus className={cl.cart_plus_icon} />
            <span>Заказать</span>
          </div>
        </div>
      ) : null}
    </div>
  )
}
