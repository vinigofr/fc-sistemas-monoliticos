import Id from "../../../@shared/domain/value-object/idValueObject";
import UsecaseInterface from "../../../@shared/usecase/usecase.interface";
import ClientFacadeInterface from "../../../client-adm/facade/client.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/productAdmFacade.interface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/storeCatalogFacade.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./placeOrder.dto";

export default class PlaceOrderUsecase implements UsecaseInterface {
  private _clientFacade: ClientFacadeInterface;
  private _productFacade: ProductAdmFacadeInterface;
  private _catalogFacade: StoreCatalogFacadeInterface;

  constructor(
    clientFacade: ClientFacadeInterface,
    productAdmFacade: ProductAdmFacadeInterface,
    catalogFacade: StoreCatalogFacadeInterface,
  ) {
    this._clientFacade = clientFacade;
    this._productFacade = productAdmFacade;
    this._catalogFacade = catalogFacade;
  }

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const client = await this._clientFacade.find({ id: input.clientId })
    if (!client) {
      throw new Error("Client not found")
    };

    await this.validateProducts(input);

    const products = await Promise.all(input.products.map((p) => this.getProduct(p.productId)));
    const clientInstance = new Client({
      address: client.address,
      id: new Id(client.id),
      email: client.email,
      name: client.name,
    });

    const orderInstance = new Order({
      client: clientInstance,
      products,
    });

    // 1. Processar o pagamento -> paymentFacade.proccess (orderId, amount)
    // 2. Caso o pagamento seja aprovado, gera invoice e atualiza o status da order para 'approved'
    // 3. Caso o pagamento seja recusado, atualiza o status da order para 'declined'
    // 4. Retornar DTO

    return {
      id: 'order-id',
      invoiceId: 'invoice-id',
      status: 'pending',
      total: 0,
      products: [],
    }
  }

  private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
    if (input.products.length === 0) {
      throw new Error("No products selected")
    }

    for (const p of input.products) {
      const product = await this._productFacade.getStock({ productId: p.productId });

      if (product.stockNumber <= 0) {
        throw new Error(`Product with id [${product.productId}] is not available in stock`);
      }
    }
  }

  private async getProduct(productId: string): Promise<Product> {
    const product = await this._catalogFacade.find({ id: productId });

    if (!product) {
      throw new Error("Product not found")
    }

    return new Product({
      id: new Id(productId),
      description: product.description,
      name: product.name,
      salesPrice: product.salesPrice,
    })
  }
}