const connection = require('./connection');

const create = async (sales) => {
  const date = new Date();
  const [addSales] = await connection.execute(
    'INSERT INTO sales (date) VALUES (?)',
    [date],
  );
  const productSales = sales.forEach(async (e) => connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [addSales.insertId, e.productId, e.quantity],
    ));

  return {
  id: addSales.insertId,
  itemsSold: productSales }; 
};

module.exports = {
  create,
};