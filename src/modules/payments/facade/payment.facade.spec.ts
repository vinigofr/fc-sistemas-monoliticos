import SequelizeDatabaseManager from "../../@shared/utils/sequelizeDatabaseManager";
import TransactionFactory from "../factory/transaction.factory";
import TransactionModel from "../repository/transaction.model";

describe('Payment facade unit tests', () => {
  let sequelize: SequelizeDatabaseManager;

  beforeEach(async () => {
    sequelize = new SequelizeDatabaseManager([TransactionModel]);
    await sequelize.sequelizeSync();
  });

  afterEach(async () => {
    await sequelize.sequelizeClose();
  });

  test('should process and approve payment', async () => {
    const facade = TransactionFactory.create();

    const processedTransaction = await facade.process({
      amount: 100,
      orderId: '123',
    });

    expect(processedTransaction.status).toBe('approved');
    expect(processedTransaction.transactionId).toBeDefined();
    expect(processedTransaction.amount).toBe(100);
    expect(processedTransaction.orderId).toBe('123');
    expect(processedTransaction.createdAt).toBeDefined();
    expect(processedTransaction.updatedAt).toBeDefined();
  });

  test('should not process and decline payment', async () => {
    const facade = TransactionFactory.create();

    const processedTransaction = await facade.process({
      amount: 99,
      orderId: '123',
    });

    expect(processedTransaction.status).toBe('declined');
    expect(processedTransaction.transactionId).toBeDefined();
    expect(processedTransaction.amount).toBe(99);
    expect(processedTransaction.orderId).toBe('123');
    expect(processedTransaction.createdAt).toBeDefined();
    expect(processedTransaction.updatedAt).toBeDefined();
  });

})