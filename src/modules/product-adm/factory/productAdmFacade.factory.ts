import ProductAdmFacade from "../facade/productAdm.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUsecase from "../usecase/add-product/addProduct.usecase";
import CheckStockUsecase from "../usecase/check-stock/checkStock.usecase";

export default class ProductAdmFacadeFactory {
  static create(): ProductAdmFacade {
    const productRepository = new ProductRepository();
    const addProductUsecase = new AddProductUsecase(productRepository);
    const checkStockUsecase = new CheckStockUsecase(productRepository);

    const productFacade = new ProductAdmFacade({
      addProductUsecase,
      checkStockUsecase,
    });

    return productFacade
  }
}