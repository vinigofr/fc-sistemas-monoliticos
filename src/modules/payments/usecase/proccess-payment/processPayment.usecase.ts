import UsecaseInterface from "../../../@shared/usecase/usecase.interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/payment.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./processPayment.dto";

export default class ProcessPaymentUsecase implements UsecaseInterface {
  private _paymentRepository: PaymentGateway;

  constructor(paymentRepository: PaymentGateway) {
    this._paymentRepository = paymentRepository;
  }

  async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
    const transaction = new Transaction({
      amount: input.amount,
      orderId: input.orderId,
    });

    transaction.proccess();

    const persistedTransaction = await this._paymentRepository.save(transaction);

    return {
      updatedAt: persistedTransaction.updatedAt,
      createdAt: persistedTransaction.createdAt,
      transactionId: persistedTransaction.id.id,
      orderId: persistedTransaction.orderId,
      amount: persistedTransaction.amount,
      status: persistedTransaction.status,
    }
  }
}