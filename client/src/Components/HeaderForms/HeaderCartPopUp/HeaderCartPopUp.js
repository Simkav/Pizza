import cl from './HeaderCartPopUp.module.css'
import cn from 'classnames'
import { useState } from 'react'
import { FaChevronDown, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa'
import PopUpModule from '../../PopUpModule/PopUpModule'
import { useDispatch, useSelector } from 'react-redux'
import CONSTANTS from '../../../constants'

export default function HeaderCartPopUp () {
  const dispatch = useDispatch()
  const [cartPopUp, setCartPopUp] = useState(false)

  const [products, cart] = useSelector(({ products, cart }) => [
    products.products,
    cart.cartItems
  ])

  /*   const handleCount = (option, id) => {
    const isExist = cart.find(item => item.id)
    if (isExist) {
      if (option === 'plus') {
        cart.map(v => v.id === id ? {...v, count: count++} : v)
      }
      if (option === 'minus') {

      }
    }
  }
 */
  return (
    <div
      className={cl.col}
      onClick={() => setCartPopUp(cartPopUp => !cartPopUp)}
    >
      <div className={cl.cart_container}>
        <FaShoppingCart />
        <span className={cl.header_menu_text}>Корзина</span>
        <FaChevronDown
          className={cn(cl.arrow_down, {
            [cl.arrow_active]: cartPopUp
          })}
        ></FaChevronDown>
      </div>
      <PopUpModule visible={cartPopUp}>
        <ul className={cl.cart_items_container}>
          {cart
            ? cart.map(item =>
                products.map(v =>
                  item.id === v.id ? (
                    <li key={v.name} className={cl.cart_product_container}>
                      <img
                        src={CONSTANTS.PUBLIC_PATH + v.image}
                        alt={v.name}
                        className={cl.product_image}
                      />
                      <div className={cl.product_name_container}>
                        <span className={cl.product_name}>{v.name}</span>
                      </div>
                      <div className={cl.product_count_container}>
                        <FaPlus
                          className={cl.product_count_button}
                          /* onClick={() => handleCount('plus', item.id)} */
                        />
                        <span className={cl.product_count}>
                          {item.count}
                        </span>
                        <FaMinus
                          className={cl.product_count_button}
                          /* onClick={() => handleCount('minus', item.id)} */
                        />
                      </div>
                    </li>
                  ) : null
                )
              )
            : null}
          <li className={cl.cart_order_button_container}>
            <div className={cl.cart_order_button}>Оформить заказ</div>
          </li>
        </ul>
      </PopUpModule>
    </div>
  )
}
