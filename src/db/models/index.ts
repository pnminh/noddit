import * as fs from "fs";
import * as path from "path";
import SequelizeStatic from 'sequelize'
const env = process.env.NODE_ENV || "development";
import configs,{environment} from '../config/config';
import {ProductAttributes, ProductInstance} from "./interfaces/product-interface";

export interface SequelizeModels {
  Product: SequelizeStatic.Model<ProductInstance, ProductAttributes>;
}

class Database {
  private _basename: string;
  private _models: SequelizeModels;
  private _sequelize: SequelizeStatic.Sequelize;

  constructor() {
    this._basename = path.basename(module.filename);
    let dbConfig = configs.getDatabaseConfig(env);

    this._sequelize = new SequelizeStatic(dbConfig.database, dbConfig.username,
      dbConfig.password, dbConfig);
    this._models = ({} as any);

    fs.readdirSync(__dirname).filter((file: string) => {
      return (file !== this._basename) && (file !== "interfaces");
    }).forEach((file: string) => {
      let model = this._sequelize.import(path.join(__dirname, file));
      this._models[(model as any).name] = model;
    });

    Object.keys(this._models).forEach((modelName: string) => {
      if (typeof this._models[modelName].associate === "function") {
        this._models[modelName].associate(this._models);
      }
    });
  }

  getModels() {
    return this._models;
  }

  getSequelize() {
    return this._sequelize;
  }
}

const database = new Database();
export const models = database.getModels();
export const sequelize = database.getSequelize();
