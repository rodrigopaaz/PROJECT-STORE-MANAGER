const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');

const { expect } = chai;
chai.use(sinonChai);

const { products, newProduct } = require('../../mocks/products.mock')
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

describe('Testes de unidade da camada services', function () {
  afterEach(sinon.restore)
  it('Listando os produtos do db', async function () {
    sinon.stub(productsModel, 'findAll').resolves([products])
    const findAll = await productsService.findAll();
    expect([...findAll.message]).to.be.deep.equal([products]);
  });

    it('Filtrando os produtos do db pelo id', async function () {
    sinon.stub(productsModel, 'findById').resolves([[products[0]]])
    const [findById] = await productsModel.findById(1);
        expect(findById[0]).to.be.deep.equal(products[0]);
    }) 
      it('Filtrando os produtos do db com um id inválido', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined)
    const findById = await productsModel.findById(1);
        expect(findById).to.be.deep.equal(undefined);
      }) 
   it('Adicionando item ao products', async function () {
     sinon.stub(productsModel, 'create').resolves(50);
     const {name} = newProduct
     const result = await productsService.create(name);
     const { message } = result;
    expect(message).to.equal(50);
  })
})