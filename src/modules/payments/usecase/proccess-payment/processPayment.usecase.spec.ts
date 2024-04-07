import Transaction from "../../domain/transaction";
import ProcessPaymentUsecase from "./processPayment.usecase";

const transaction = new Transaction({
  amount: 101,
  orderId: '1',
  status: 'approved',
});

const mockRepository = () => ({
  save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
});

describe('ProcessPaymentUsecase', () => {
  it('should process payment', async () => {
    const repository = mockRepository();
    const processPaymentUsecase = new ProcessPaymentUsecase(repository);

    const transactionProcessResult = await processPaymentUsecase.execute({
      // this data doesn't matter for this test, because we are mocking the repository
      amount: 101,
      orderId: transaction.orderId,
    });

    expect(repository.save).toHaveBeenCalled();
    expect(transactionProcessResult.amount).toBe(101);
    expect(transactionProcessResult.orderId).toBe('1');
    expect(transactionProcessResult.status).toBe('approved');
    expect(transactionProcessResult.transactionId).toBe(transaction.id.id);
    expect(transactionProcessResult.createdAt).toBe(transaction.createdAt);
    expect(transactionProcessResult.updatedAt).toBe(transaction.updatedAt);
  });
});