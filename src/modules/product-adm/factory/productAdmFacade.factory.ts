import ProductAdmFacade from "../facade/productAdm.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUsecase from "../usecase/add-product/addProduct.usecase";

export default class ProductAdmFacadeFactory {
  static create(): ProductAdmFacade {
    const productRepository = new ProductRepository();
    const addProductUsecase = new AddProductUsecase(productRepository);

    const productFacade = new ProductAdmFacade({
      addProductUsecase,
      checkStockUsecase: undefined
    });

    return productFacade
  }
}