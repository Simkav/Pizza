import cl from './ProductIngridients.module.css'

export default function ProductIngridients ({ item, ingridients }) {
  return (
    <div className={cl.product_ingridients_container}>
      <p>
        {item.ingredients.map((ingridientID, productIngredientsIndex) =>
          ingridients.map(ingridient =>
            ingridient.id === ingridientID
              ? productIngredientsIndex < item.ingredients.length - 1
                ? `${ingridient.name}, `
                : `${ingridient.name}.`
              : null
          )
        )}
      </p>
    </div>
  )
}
