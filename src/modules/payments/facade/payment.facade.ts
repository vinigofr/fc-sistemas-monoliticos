import UsecaseInterface from "../../@shared/usecase/usecase.interface";
import { PaymentFacadeInputDto, PaymentFacadeInterface, PaymentFacadeOutputDto } from "./payment.facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
  private _processPaymentUsecase: UsecaseInterface;

  constructor(processPaymentUsecase: UsecaseInterface) {
    this._processPaymentUsecase = processPaymentUsecase;
  }

  async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return await this._processPaymentUsecase.execute(input);
  }
}