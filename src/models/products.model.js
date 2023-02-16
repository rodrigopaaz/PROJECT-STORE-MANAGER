const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return result; 
};

const findById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return result; 
};

const create = async (name) => {
  const [result] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return result.insertId; 
};

const update = async (id, newData) => {
  const [result] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [newData, id],
  );
  return result;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
};