const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { addSaleMock,insertSaleMock,listSalesMock } = require('../../mocks/sales.mocks')
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');

describe('Testes de unidade da camada sales.controllers', function () {
  afterEach(sinon.restore)
  it('Listando vendas do db', async function () {
    const res = {}
    const req = {}
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'findAll').resolves({
      type: null, message: listSalesMock
    })
    await salesController.listProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(listSalesMock)
  });
 
     it('Filtrando os produtos do db pelo id', async function () {
     const res = {}
       const req = {
      params: {id: 1}
    }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const filteredMock = listSalesMock[0]
    sinon.stub(salesService, 'findById').resolves({
      type: null, message: [filteredMock]
    })
       await salesController.getProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([filteredMock])
     });

    it('Filtrando os produtos do db com um id inválido', async function () {
     const res = {}
       const req = {
      params: {id: 999}
    }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'findById').resolves({
      type: 'NOT_FOUND', message: 'Sale not found'
    })
       await salesController.getProduct(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: 'Sale not found'})
    });
  it('Adicionando Sale', async function () {
     const res = {}
     const req = {
      body: insertSaleMock
    }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'create').resolves({ type: null, message: { id: 3} });
    await salesController.addSales(req, res);
    console.log(res.json)
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(addSaleMock);
  })
})