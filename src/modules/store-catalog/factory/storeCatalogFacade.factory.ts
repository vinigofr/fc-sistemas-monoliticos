import StoreCatalogFacade from "../facade/storeCatalog.facade";
import ProductRepository from '../repository/product.repository';
import FindAllProductsUsecase from '../usecase/find-all-products/findAllProducts.usecase'
import FindProductUsecase from '../usecase/find-product/findProduct.usecase'

export default class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
    const productRepository = new ProductRepository();
    const findAllProductsUsecase = new FindAllProductsUsecase(productRepository);
    const findProductUsecase = new FindProductUsecase(productRepository);

    const productFacade = new StoreCatalogFacade({
      findAllProductsUsecase,
      findProductUsecase,
    });

    return productFacade
  }
}