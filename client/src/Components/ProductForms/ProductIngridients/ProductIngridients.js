import cl from './ProductIngridients.module.css'

export default function ProductIngridients({item, ingridients}) {
  return (
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
  );
}
