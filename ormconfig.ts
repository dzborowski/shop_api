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
        process.env.NODE_ENV === "prod" ? "build/src/entity/**/*.js" : "src/entity/**/*.ts",
    ],
    migrations: [
        process.env.NODE_ENV === "prod" ? "build/src/migration/**/*.js" : "src/migration/**/*.ts",
    ],
    cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
    },
};
