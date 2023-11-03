import express, { Request, Response } from "express";
import { Router } from "express";
import * as AdService from '../services/ad.service'

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const categoryId: number = parseInt(req.query.categoryId as string)
    let search: string = req.query.search as string;
    if(!search){
        search = '';
    }

    const ads = await AdService.search(categoryId, search);    
    res.send(ads);
})

router.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    if(isNaN(id)){
        res.sendStatus(400);
        return;
    }

    const ad = await AdService.findAdById(id);

    res.send(ad);
})

router.post('/', async (req: Request, res: Response) => {
    await AdService.create({ ...req.body });
    res.send("Annoce crée !")
})

router.put('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    try {
        const ad = await AdService.update(id, {...req.body}, req.body.categoryId);
        console.log(ad);
        
        res.send(ad);
    } catch (error) {
        res.sendStatus(404);
    }

})

router.delete('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    await AdService.deleteAd(id);
    res.sendStatus(204);
})

export default router;
