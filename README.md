## Run project:

##### Production build:

```
docker-compose up
```

##### Development build:

```
npm run dev:build
npm run dev:start
```

##### Run migrations:

```
npx typeorm migration:run --config build/OrmConfig.js
```

##### Generate migration:

```
npx typeorm migration:generate -n UserEntity -d src/user/migration --config build/OrmConfig.js
```
