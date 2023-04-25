import express from 'express';
import { PORT } from './config';
import loaders from './loaders';

const app = express();

loaders(app);

app.listen(PORT, (err?: any) => {
    if (err) {
        console.log(err);
        return process.exit(1);
    }
    console.log(`Server is running on ${PORT}`);
});
