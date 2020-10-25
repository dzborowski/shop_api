module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [
    process.env.NODE_ENV === 'prod'
      ? 'build/src/entity/**/*.js'
      : 'src/entity/**/*.ts'
  ],
  migrations: [
    process.env.NODE_ENV === 'prod'
      ? 'build/src/migration/**/*.js'
      : 'src/migration/**/*.ts'
  ],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration'
  }
}
