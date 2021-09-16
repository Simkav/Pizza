import cl from "./Products.module.css";

function Products() {
  const productsArray = [
    {
      category: "pizza",
      image: "image",
      name: "123",
      size: "size",
      price: "price",
      ingridients: "123, 123, 123",
    },
  ];

  return (
    <ul className={cl.products_container}>
      {Array(11)
        .fill("")
        .map((item, index) => {
          return (
            <li key={index} className={cl.product}>
              <a className={cl.product_link_container}>
                <div className={cl.product_image_container}>
                  <img className={cl.product_image} src={"/pizzasImages/testPizzaItem.png"}></img>
                </div>
                <span>Product Title</span>
                <span>Ingridients:</span>
              </a>
              <span>Price</span>
              <span>Size</span>
            </li>
          );
        })}
    </ul>
  );
}

export default Products;
