const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { products, newProduct, newProductMock, updatedProduct } = require('../../mocks/products.mock')
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

describe('Testes de unidade da camada controllers', function () {
  afterEach(sinon.restore)
  it('Listando os produtos do db', async function () {
    const res = {}
    const req = {}
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findAll').resolves({
      type: null, message: products
    })
    await productsController.listProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products)
  });

     it('Filtrando os produtos do db pelo id', async function () {
     const res = {}
       const req = {
      params: {id: 1}
    }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findById').resolves({
      type: null, message: products
    })
       await productsController.getProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products)
     });
    it('Filtrando os produtos do db com um id inválido', async function () {
     const res = {}
       const req = {
      params: {id: 999}
    }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findById').resolves({
      type: 'PRODUCT_NOT_FOUND', message: 'Product not found'
    })
       await productsController.getProduct(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: 'Product not found'})
    });
  it('Adicionando item ao products', async function () {
     const res = {}
     const req = {
      body: newProduct
    }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'create').resolves({ type: null, message: 51 });
    await productsController.addProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProductMock);
  })

    it('Testing products controller validations', async function () {
     const res = {}
     const req = {
      body: newProduct
    }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'create').resolves({ type: 'NOT_FOUND', message: 51 });
    await productsController.addProduct(req, res);
    expect(res.status).to.have.been.calledWith(404);
    })
    it('Atualizando produtos do db pelo id', async function () {
     const res = {}
       const req = {
         params: { id: 1 },
         body: { updatedProduct }
    }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'update').resolves({
      type: null, message: updatedProduct
    })
       await productsController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updatedProduct)
    });
  
    it('Removendo produtos do db pelo id', async function () {
     const res = {}
       const req = {
         params: { id: 1 },
    }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'deleteProduct').resolves({
      type: null, message: updatedProduct
    })
       await productsController.removeProduct(req, res);
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith()
     });
})