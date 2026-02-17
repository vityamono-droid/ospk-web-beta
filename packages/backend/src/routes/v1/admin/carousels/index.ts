import { Router } from 'express'
import { deleteCarousel, getCarousel, listCarousels, upsertCarousel } from './handlers'
import withFormData from '@middleware/formData.middleware'
import withParseForm from '@middleware/parseForm.middleware'

const carouselsRouter = Router()

carouselsRouter.get('/', listCarousels)
carouselsRouter.get('/:id', getCarousel)
carouselsRouter.post(
  '/',
  withFormData({ type: 'SINGLE', fieldName: 'banner' }),
  withParseForm({ dest: 'static/carousels/banners' }),
  upsertCarousel,
)
carouselsRouter.put(
  '/:id',
  withFormData({ type: 'SINGLE', fieldName: 'banner' }),
  withParseForm({ dest: 'static/carousels/banners' }),
  upsertCarousel,
)
carouselsRouter.delete('/:id', deleteCarousel)

export default carouselsRouter
