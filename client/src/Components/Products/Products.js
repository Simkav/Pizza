import cl from "./Products.module.css";
import cn from "classnames";

function Products() {
  return (
    <ul className={cl.products_container}>
      {Array(11)
        .fill("")
        .map((item, index) => {
          return (
            <li key={index} className={cl.product}>
              <a className={cl.product_link_container}>
                <div className={cl.product_image_container}>
                  <img
                    className={cl.product_image}
                    src={"/pizzasImages/testPizzaItem.png"}
                  ></img>
                </div>
                <h3>Product Title</h3>
                <div className={cl.product_ingridients_container}>
                  <p>
                    Соус білий, сир моцарела, бекон, фарш з яловичини, помідор,
                    огірок солоний, цибуля, сир чедер, орегано базилік
                  </p>
                </div>
              </a>
              <div className={cl.product_footer}>
                <span className={cl.product_price}>100</span>
                <div className={cl.product_sizes}>
                  <div className={cn(cl.product_size, cl.product_size_active)}>
                    <span>M</span>
                  </div>
                  <div className={cl.product_size}>
                    <span>L</span>
                  </div>
                  <div className={cl.product_size}>
                    <span>XL</span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
}

export default Products;
