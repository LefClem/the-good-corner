import express, { Request, Response } from 'express'
import * as CategoryService from '../services/category.service'

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const terms: string = req.query.terms as string;

    const categories = await CategoryService.getCategories(terms);
    res.send(categories);
})

export default router;
