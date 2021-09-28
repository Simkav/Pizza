import cl from './ProductBody.module.css'
import CONSTANTS from '../../../constants'

function ProductBody({item, ingridients}) {
  return (
    <div className={cl.product_link_container}>
      <div className={cl.product_image_container}>
        <img
          className={cl.product_image}
          src={CONSTANTS.PUBLIC_PATH + item.image}
          alt={item.name}
        />
      </div>
      <h3>{item.name}</h3>
      <div className={cl.product_ingridients_container}>
        <p>
          {item.Ingredients.map((ingridientID, productIngredientsIndex) => {
            return ingridients
              ? ingridients.map((ingridient) => {
                  if (ingridient.id === ingridientID) {
                    return productIngredientsIndex < item.Ingredients.length - 1
                      ? `${ingridient.name}, `
                      : `${ingridient.name}.`;
                  }
                })
              : null;
          })}
        </p>
      </div>
    </div>
  );
}

export default ProductBody;
