import Id from "../../@shared/domain/value-object/idValueObject";
import SequelizeDatabaseManager from "../../@shared/utils/sequelizeDatabaseManager";
import Transaction from "../domain/transaction";
import TransactionModel from "./transaction.model";
import TransactionRepository from "./transaction.repository";

describe('TransactionRepository test', () => {
  let sequelize: SequelizeDatabaseManager;

  beforeEach(async () => {
    sequelize = new SequelizeDatabaseManager([TransactionModel])
    await sequelize.sequelizeSync();
  });

  afterEach(async () => {
    await sequelize.sequelizeClose();
  })

  test('should save a transaction', async () => {
    const productRepository = new TransactionRepository();

    const transaction = new Transaction({
      id: new Id("1"),
      amount: 100,
      orderId: "1",
    });

    const savedTransaction = await productRepository.save(transaction);
    const transactionFound = await TransactionModel.findOne({
      where: { id: transaction.id.id },
      raw: true,
    });

    expect(savedTransaction.id.id).toBe(transactionFound.id);
    expect(savedTransaction.amount).toBe(transactionFound.amount);
    expect(savedTransaction.orderId).toBe(transactionFound.orderId);
    expect(savedTransaction.status).toBe(transactionFound.status);
    expect(savedTransaction.createdAt).toStrictEqual(new Date(transactionFound.createdAt));
    expect(savedTransaction.updatedAt).toStrictEqual(new Date(transactionFound.updatedAt));

  });
})