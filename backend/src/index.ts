import express, {Request, Response} from 'express'
import { Ad } from './types/ad';
import sqlite3 from 'sqlite3';

const app = express();
const port = 3000;
const db = new sqlite3.Database('../good-corner.sqlite');

const ads: Array<Ad> = [
    {
      id: 1,
      title: "Bike to sell",
      description:
        "My bike is blue, working fine. I'm selling it because I've got a new one",
      owner: "bike.seller@gmail.com",
      price: 100,
      picture:
        "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
      location: "Paris",
      createdAt: "2023-09-05T10:13:14.755Z",
    },
    {
      id: 2,
      title: "Car to sell",
      description:
        "My car is blue, working fine. I'm selling it because I've got a new one",
      owner: "car.seller@gmail.com",
      price: 10000,
      picture:
        "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
      location: "Paris",
      createdAt: "2023-10-05T10:14:15.922Z",
    },
];

app.use(express.json());

app.post('/ads', (req: Request, res: Response) => {
    const ids: number[] = ads.map<number>((ad) => ad.id);
    const ad: Ad = {
        id : Math.max(...ids) + 1,
        ...req.body
    }

    ads.push(ad);
    res.send(ads);
    
})

app.delete('/ads/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    ads.splice(ads.findIndex((ad) => ad.id === id));

    res.send(ads);
})

app.put('/ads/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    const newAds: Ad[] = ads.map<Ad>((ad) => {

        if(ad.id === id){
            return { 
                ...ad,
                ...req.body
            }
        }
        return ad;
    })

    res.send(newAds);
})

app.get('/ads', (req: Request, res: Response) => {
    db.all("SELECT * FROM ad", (err, rows) => {
        try {
            res.send(rows);
        } catch (error) {
            res.send(err);
        }

    })
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
    
})
