import express from 'express';
import * as adController from './controllers/ad.controller'
import * as categoryController from './controllers/category.controller'
import cors from 'cors'
import { dataSource } from './config/db';

const app = express();
const port: number = 3001;

app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json());

app.use('/ads', adController)
app.use('/categories', categoryController)

app.listen(port, async () => {
    await dataSource.initialize();

    console.log(`Server started at http://localhost:${port}`);
})