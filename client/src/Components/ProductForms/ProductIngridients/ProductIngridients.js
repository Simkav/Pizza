import cl from './ProductIngridients.module.css'

export default function ProductIngridients ({ item, ingridients }) {
  return (
    <div className={cl.product_ingridients_container}>
      <p>
        {item.Ingredients.map((ingridientID, productIngredientsIndex) =>
          ingridients.map(ingridient =>
            ingridient.id === ingridientID
              ? productIngredientsIndex < item.Ingredients.length - 1
                ? `${ingridient.name}, `
                : `${ingridient.name}.`
              : null
          )
        )}
      </p>
    </div>
  )
}
