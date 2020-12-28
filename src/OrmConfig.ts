import {AppConfig} from "./AppConfig";
import {ConnectionOptions} from "typeorm/connection/ConnectionOptions";

export default {
  type: "postgres",
  host: AppConfig.getDatabaseHost(),
  port: AppConfig.getDatabasePort(),
  username: AppConfig.getDatabaseUser(),
  password: AppConfig.getDatabasePassword(),
  database: AppConfig.getDatabaseName(),
  synchronize: false,
  logging: false,
  entities: [
    "build/**/*.js",
  ],
  migrations: [
    "build/**/migration/*.js",
  ],
} as ConnectionOptions;
