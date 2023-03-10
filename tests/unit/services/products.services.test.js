const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');

const { expect } = chai;
chai.use(sinonChai);

const { products, newProduct, updatedProduct } = require('../../mocks/products.mock')
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
       })
        it('Atualizando os produtos do db pelo id', async function () {
          sinon.stub(productsModel, 'update').resolves({ affectedRows: 1})
          const update = await productsService.update(1, updatedProduct.name);
    expect(update.message).to.be.deep.equal({ id:1, name: updatedProduct.name});
    });
      it('Atualizando os produtos do db com id inválido', async function () {
    sinon.stub(productsModel, 'update').resolves([updatedProduct])
    const update = await productsService.update(1, updatedProduct);
    expect(update.type).to.be.deep.equal("BAD_REQUEST");
      });
          it('Excluindo os produtos do db pelo id', async function () {
          sinon.stub(productsModel, 'deleteProduct').resolves({affectedRows: 1})
          const { type } = await productsService.deleteProduct(1);
          expect( type ).to.be.deep.equal('');
    });
        it('Excluindo os produtos do db com id inválido', async function () {
          sinon.stub(productsModel, 'deleteProduct').resolves(1)
          const update = await productsService.deleteProduct(updatedProduct);
    expect(update.type).to.be.deep.equal('NOT_FOUND');
    });
  
})