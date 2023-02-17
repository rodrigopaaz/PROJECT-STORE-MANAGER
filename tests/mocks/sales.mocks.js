const insertSaleMock = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const addSaleMock = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

const listSalesMock = [
  {
    "saleId": 1,
    "date": "2023-02-16T21:25:41.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-02-16T21:25:41.000Z",
    "productId": 3,
    "quantity": 15
  }
]


module.exports = {
  insertSaleMock,
  listSalesMock,
  addSaleMock
}