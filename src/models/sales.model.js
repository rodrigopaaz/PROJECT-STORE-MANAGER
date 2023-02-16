const connection = require('./connection');

const create = async (sales) => {
  const [addSales] = await connection.execute(
   'INSERT INTO StoreManager.sales(date) VALUES(NOW())',
  );
  const productSales = await Promise.all(sales.map((e) => {
    const insertId = connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [addSales.insertId, e.productId, e.quantity],
    );
    return insertId;
  }));

  return {
  id: addSales.insertId,
  itemsSold: productSales }; 
};

module.exports = {
  create,
};