# API Project Build with Express and TypeORM

## Steps to run this project:

1. Setup environmental variables inside `.env` file and run API via docker or locally
2. Run `yarn install` command if you want run API locally

###### Docker:
Currently only the developer version is available

```
docker-compose up
```

###### Local production:

```
yarn run prod
```

###### Local development:

```
yarn run dev
```

###### Run migrations locally - optional:
Currently migrations are started automatically after API startup

```
yarn run migration:run
```

###### Generate migration:

```
yarn run migration:generate <migration_name>
```

###### Tslint fix:

```
yarn run tslint-fix
```

###### Prettier fix:

```
yarn run prettier-fix
```