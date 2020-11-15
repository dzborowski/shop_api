import {join} from "path";

module.exports = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_INNER_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [
    join(__dirname, "src", "**", "*.{ts,js}"),
  ],
  migrations: [
    join(__dirname, "src", "**", "migration", "*.{ts,js}"),
  ],
};
