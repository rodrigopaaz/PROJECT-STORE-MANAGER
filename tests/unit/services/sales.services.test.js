const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');

const { expect } = chai;
chai.use(sinonChai);

const { insertSaleMock, listSalesMock, addSaleMock } = require('../../mocks/sales.mocks')
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');

describe('Testes de unidade da camada services', function () {
  afterEach(sinon.restore)
  it('Listando os vendas do db', async function () {
    sinon.stub(salesModel, 'findAll').resolves([listSalesMock])
    const sales = await salesModel.findAll();
    expect(sales).to.be.deep.equal([listSalesMock]);
  });

     it('Filtrando vendas pelo id', async function () {
    sinon.stub(salesModel, 'findById').resolves([listSalesMock])
       const [findById] = await salesModel.findById(1);
        expect(findById).to.be.deep.equal(listSalesMock);
    }) 
    it('Filtrando os vendas do db com um id inválido', async function () {
    sinon.stub(salesModel, 'findById').resolves({
    "message": "Sale not found"
})
    const { message } = await salesService.findById(1);
        expect(message).to.be.deep.equal( 'Sale not found');
      }) 
    it('Verificando erro ao cadastrar item com id inválido', async function () {
     sinon.stub(salesModel, 'create').resolves(50);     
     const result = await salesService.create([insertSaleMock]);
     const { type } = result;
    expect(type).to.equal('BAD_REQUEST');
    })
     it('Verificando erro ao cadastrar item com id inexistente', async function () {
     sinon.stub(salesModel, 'create').resolves(insertSaleMock);     
       const result = await salesService.create([{ productId: 999, quantity: 1 }]);
     const { type } = result;
     expect(type).to.equal('NOT_FOUND');
     })
     it('Verificando erro ao cadastrar item com id correto', async function () {
       sinon.stub(salesModel, 'create').resolves(addSaleMock);   
       const result = await salesService.create(insertSaleMock);
       const { type } = result;
       expect(type).to.equal(null);
   })
    /*
     it('Testings products validation [name] bigger than or equal to 5', async function () {
     sinon.stub(productsModel, 'create').resolves(50);
     const {name} = newProduct
     const result = await productsService.create('name');
     const { message } = result;
    expect(message).to.equal('"name" length must be at least 5 characters long');
     })
  
       it('Testings products validation [name] not null', async function () {
     sinon.stub(productsModel, 'create').resolves(50);
     const {name} = newProduct
     const result = await productsService.create('');
     const { message } = result;
    expect(message).to.equal('"name" is not allowed to be empty');
       })  */
  
})