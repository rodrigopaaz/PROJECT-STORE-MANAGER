const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
`SELECT prod.sale_id, sal.date, prod.product_id, prod.quantity FROM sales_products AS prod
INNER JOIN
sales AS sal
ON sal.id = prod.sale_id
ORDER BY prod.sale_id, prod.product_id
`,
  );
  return camelize(result); 
};

const findById = async (id) => {
  const [result] = await connection.execute(
    `SELECT sal.date, prod.product_id, prod.quantity 
    FROM sales_products AS prod
    INNER JOIN
    sales AS sal
    ON sal.id = prod.sale_id
    WHERE sale_id = ? 
    ORDER BY prod.sale_id, prod.product_id`,
    [id],
  );
  return camelize(result); 
};

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

/* const update = async (id, newData) => {
  const [result] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [newData, id],
  );
  return result;
}; */

const deleteSale = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM sales_products WHERE sale_id = ?',
    [id],
  );
  return result;
};

module.exports = {
  create,
  findAll,
  findById,
  deleteSale,
};