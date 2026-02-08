import { Router } from 'express'
import { addCategory, deleteCategory, getCategory, listCategories, updateCategory } from './handlers'

const serviceCategoriesRouter = Router()

serviceCategoriesRouter.get('/', listCategories)
serviceCategoriesRouter.get('/:id', getCategory)
serviceCategoriesRouter.post('/', addCategory)
serviceCategoriesRouter.patch('/:id', updateCategory)
serviceCategoriesRouter.delete('/:id', deleteCategory)

export default serviceCategoriesRouter
