import express from 'express'
import router from './routes/index.js';
import cors from 'cors';
import dotenv from 'dotenv'

import { connectToDB } from './db.js';

dotenv.config();
connectToDB();
const app = express();

app.use(cors());
app.use(express.json())
app.use('/api/v1', router);


app.listen(4000, () => {
    console.log(`👍✌️ Local: http://localhost:4000`);
})