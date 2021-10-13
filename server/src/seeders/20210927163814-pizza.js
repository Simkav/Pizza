'use strict';

const defaultPizza = {
  name: 'Пицца абобус',
  price: 100.0,
  weight: 120,
  image: '/pizzas/testPizza.png',
};

const getRandom = (max) => (Math.random() * (max - 1) + 1).toFixed(2);

const createPizzaArr = () =>
  Array(10)
    .fill(null)
    .map((_, i) => {
      const name = defaultPizza.name + i;
      const image = `/pizzas/${Math.floor(getRandom(25))}.png`;
      const price = getRandom(200);
      const weight = Math.floor(getRandom(200));
      return { name, image, price, weight };
    });

const pizzaArr = createPizzaArr();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('pizzas', pizzaArr, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('pizzas', null, {});
  },
};
