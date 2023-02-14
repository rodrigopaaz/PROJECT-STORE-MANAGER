const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');

const { expect } = chai;
chai.use(sinonChai);

const {products, newProduct} = require('../../mocks/products.mock')
const { productsModel } = require('../../../src/models');

describe('Testes de unidade da camada models', function () {
  afterEach(sinon.restore)
  it('Listando os produtos do db', async function () {
    sinon.stub(connection, 'execute').resolves([products])
    const findAll = await productsModel.findAll();
    expect(findAll).to.be.deep.equal(products);
  });

  it('Filtrando os produtos do db pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]])
    const findById = await productsModel.findById(1);
    expect(findById).to.be.deep.equal(products[0]);
  });

  it('Adicionando item ao products', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 50 }]);
    const result = await productsModel.create(newProduct);
    expect(result).to.equal(50);
  })
  
})