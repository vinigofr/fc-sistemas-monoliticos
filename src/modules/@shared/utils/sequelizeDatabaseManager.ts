import { ModelCtor, Sequelize, SequelizeOptions } from "sequelize-typescript";

const sequelizeConfig: SequelizeOptions = {
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false,
  sync: { force: true }
}

export default class SequelizeDatabaseManager {
  private _sequelize: Sequelize;
  private _models: ModelCtor[];

  constructor(models: ModelCtor[]) {
    this._sequelize = new Sequelize(sequelizeConfig);
    this._models = models;
  }

  async sequelizeSync(): Promise<void> {
    await this._sequelize.addModels(this._models);
    await this._sequelize.sync();
  }

  async sequelizeClose(): Promise<void> {
    await this._sequelize.close();
  }
}