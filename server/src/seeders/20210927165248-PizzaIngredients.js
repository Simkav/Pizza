'use strict';

const getIngredientsId = (count, max) => {
  const set = new Set();
  while (set.size < count) {
    set.add(Math.round(Math.random() * max));
  }
  return [...set];
};

const arr = Array(10)
  .fill(null)
  .map((_, pid) => {
    const ingredientsIds = getIngredientsId(5, 13);
    return Array(5)
      .fill(null)
      .map((_, iid) => ({
        pizzaId: pid + 1,
        ingredientId: ingredientsIds[iid] + 1,
      }));
  })
  .flat();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log(arr);
    await queryInterface.bulkInsert('pizza_ingredients', arr, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('pizza_ingredients', null, {});
  },
};
