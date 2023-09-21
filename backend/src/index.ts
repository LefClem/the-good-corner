import express, {Request, Response} from 'express'
// import { Ad } from './types/ad';
import "reflect-metadata";
import { dataSource } from '../src/config/db'
import { Ad } from './entities/ad';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/ads', (req: Request, res: Response) => {    
    const ad = new Ad();
    ad.title = req.body.title;
    ad.description = req.body.description;
    ad.owner = req.body.owner;
    ad.price = req.body.price;
    ad.picture = req.body.picture;
    ad.location = req.body.location;
    ad.createdAt = new Date();

    ad.save();

    res.send(ad);

})

app.delete('/ads/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    
    await Ad.delete({ id : id});
    res.send("Supprimer avec succès !")
})

app.put('/ads/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    const ad = await Ad.findOneBy({ id : id});
    if(ad !== null){
        ad.title = req.body.title;
        ad.description = req.body.description;
        ad.owner = req.body.owner;
        ad.price = req.body.price;
        ad.picture = req.body.picture;
        ad.location = req.body.location;
        ad.createdAt = new Date();
        ad.save();
    }

    res.send(ad);
});


app.get('/ads', async (req: Request, res: Response) => {
    const ads = await Ad.find();

    res.send(ads);
})

app.get('/ads/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    const ad = await Ad.findBy({ id : id})
    res.send(ad);
})

app.listen(port, async () => {
    await dataSource.initialize();

    console.log(`Server started at http://localhost:${port}`);
})
