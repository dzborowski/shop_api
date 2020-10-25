import { Request, Response, Router } from 'express'
const router = Router()

router.route('/')
  .get((req: Request, res: Response) => {
    res.status(200).send('sub-category')
  })

export default router
