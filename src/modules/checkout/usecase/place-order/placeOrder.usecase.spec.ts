import Id from "../../../@shared/domain/value-object/idValueObject";
import ProductAdmFacadeInterface from "../../../product-adm/facade/productAdmFacade.interface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/storeCatalogFacade.interface";
import Product from "../../domain/product.entity";
import { PlaceOrderInputDto } from "./placeOrder.dto";
import PlaceOrderUsecase from "./placeOrder.usecase";

const mockDate = new Date(2000, 1, 27)

describe('PlaceOrderUsecase unit test', () => {
  describe("validateProducts method", () => {
    test("should throw an error if there are no products selected", async () => {
      //@ts-expect-error - no params in constructor
      const placeOrderUsecase = new PlaceOrderUsecase();

      const input: PlaceOrderInputDto = {
        clientId: "0",
        products: [],
      }

      await expect(async () => await placeOrderUsecase["validateProducts"](input))
        .rejects
        .toThrow("No products selected")
    });

    test("should throw an error when products is out of stock", async () => {
      //@ts-expect-error - no params in constructor
      const placeOrderUsecase = new PlaceOrderUsecase();

      const mockProductFacade = {
        getStock: jest.fn(({ productId }: { productId: string }) => Promise.resolve({
          productId,
          stockNumber: productId === "1" ? 0 : 1
        }),
        ),
        getProduct: jest.fn(),
        addProduct: jest.fn(),
      };

      let input: PlaceOrderInputDto = {
        clientId: "0",
        products: [{ productId: "1" }],
      };

      placeOrderUsecase["_productFacade"] = mockProductFacade;
      await expect(async () => await placeOrderUsecase["validateProducts"](input))
        .rejects
        .toThrow("Product with id [1] is not available in stock");
      expect(mockProductFacade.getStock).toHaveBeenCalledTimes(1);


      input = {
        clientId: "0",
        products: [{ productId: "2" }, { productId: "1" }]
      };
      await expect(async () => await placeOrderUsecase["validateProducts"](input))
        .rejects
        .toThrow("Product with id [1] is not available in stock");

      expect(mockProductFacade.getStock).toHaveBeenCalledTimes(3);
    });
  });

  describe("getProducts method", () => {
    beforeAll(() => {
      jest.useFakeTimers("modern");
      jest.setSystemTime(mockDate);
    });

    beforeAll(() => {
      jest.useRealTimers();
    });

    //@ts-expect-error - no params in constructor
    const placeOrderUsecase = new PlaceOrderUsecase();

    test('should throw an error when product is not found', async () => {
      const mockCatalogFacade: StoreCatalogFacadeInterface = {
        find: jest.fn().mockResolvedValue(null),
        findAll: jest.fn().mockResolvedValue(null),
      }

      placeOrderUsecase["_catalogFacade"] = mockCatalogFacade;

      await expect(placeOrderUsecase["getProduct"]("0")).rejects.toThrow("Product not found");

      expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1);
    });

    test("should return a product", async () => {
      const mockCatalogFacade: StoreCatalogFacadeInterface = {
        find: jest.fn().mockResolvedValue({
          id: "0",
          name: "Product 0",
          description: "Product 0 description",
          salesPrice: 0,
        }),
        findAll: jest.fn().mockResolvedValue(null),
      };

      placeOrderUsecase["_catalogFacade"] = mockCatalogFacade;

      await expect(placeOrderUsecase["getProduct"]("0")).resolves.toEqual(new Product({
        description: 'Product 0 description',
        id: new Id('0'),
        name: 'Product 0',
        salesPrice: 0
      }));

      expect(mockCatalogFacade.find).toHaveBeenCalled()
    });
  });

  describe("execute method", () => {
    test("should throw an error when client is not found", async () => {
      const mockClientFacade = { find: jest.fn().mockResolvedValue(null) };

      //@ts-expect-error - no params in constructor
      const placeOrderUsecase = new PlaceOrderUsecase();

      //@ts-expect-error - force set clientFacade
      placeOrderUsecase["_clientFacade"] = mockClientFacade;

      const input: PlaceOrderInputDto = { clientId: "0", products: [] }

      await expect(async () => placeOrderUsecase.execute(input))
        .rejects
        .toThrow("Client not found");
    })

    test("should thrown an error when products are not valid", async () => {
      const mockClientFacade = { find: jest.fn().mockResolvedValue(true) };

      //@ts-expect-error - no params in constructor
      const placeOrderUsecase = new PlaceOrderUsecase();

      const mockValidateProducts = jest
        //@ts-expect-error - spy on private method
        .spyOn(placeOrderUsecase, "validateProducts")
        // @ts-expect-error - not return never
        .mockRejectedValue(new Error("No products selected"));

      //@ts-expect-error - force set clientFacade
      placeOrderUsecase["_clientFacade"] = mockClientFacade;

      const input: PlaceOrderInputDto = { clientId: "1", products: [] }

      await expect(async () => placeOrderUsecase.execute(input))
        .rejects
        .toThrow("No products selected");

      expect(mockValidateProducts).toHaveBeenCalledTimes(1);
    })
  });
})