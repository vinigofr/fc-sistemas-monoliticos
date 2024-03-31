import ProductAdmFacade from "../facade/productAdm.facade";
import ProductAdmFacadeFactory from "./productAdmFacade.factory"

describe("ProductAdmFacadeFactory test", () => {
  test("should instantiate a ProductAdmFacade", () => {
    const productAdmFacade = ProductAdmFacadeFactory.create();

    expect(productAdmFacade).toBeInstanceOf(ProductAdmFacade);
  })
})