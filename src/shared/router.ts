import { Router } from 'express'
import { celebrate } from 'celebrate'
import * as handler from 'express-async-handler'
import CurdController from './crud-controller'
import { IRouterConfig } from './models'
import { paramSchema, querySchema } from './common'

export const getCrudRouter = <T>(
  model: CurdController<T>,
  config: IRouterConfig
): Router => {
  const router = Router()

  router
    .route(config.prefix)
    .get(celebrate({ query: querySchema }), handler(model.getAll))
    .post(celebrate({ body: config.createObj }), handler(model.create))

  router
    .route(`${config.prefix}/:id`)
    .get(celebrate({ params: paramSchema }), handler(model.getOne))
    .patch(
      celebrate({
        params: paramSchema,
        body: config.updateObj
      }),
      handler(model.update)
    )
    .delete(celebrate({ params: paramSchema }), handler(model.delete))

  return router
}
