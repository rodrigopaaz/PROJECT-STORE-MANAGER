const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');

const { expect } = chai;
chai.use(sinonChai);

const {insertSaleMock, listSalesMock} = require('../../mocks/sales.mocks')
const { salesModel } = require('../../../src/models');

describe('Testes de unidade da camada sales.models', function () {
  afterEach(sinon.restore)
  it('Listando os produtos do db', async function () {
    sinon.stub(connection, 'execute').resolves([listSalesMock])
    const findAll = await salesModel.findAll();
    expect(findAll).to.be.deep.equal(listSalesMock);
  });

  it('Filtrando os produtos do db pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[listSalesMock[0]]])
    const [findById] = await salesModel.findById(1);
    expect(findById).to.be.deep.equal(listSalesMock[0]);
  });

  it('Adicionando item ao products', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 50 }]);
    const result = await salesModel.create(insertSaleMock);
    expect(result.id).to.equal(50);
  })
  
})