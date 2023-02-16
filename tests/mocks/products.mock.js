const products = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
];
const newProduct = {
  name: "Mascara do Hulk"
}

const newProductMock = { id: 51, ...newProduct };

module.exports = {
  products,
  newProduct,
  newProductMock
}