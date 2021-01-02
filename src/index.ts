import "reflect-metadata";
import {createConnection} from "typeorm";
import express, { Request, Response } from 'express'

import {User} from "./entity/User";
import UserCrud from "./cruds/UserCrud";
import PostCrud from "./cruds/PostCrud";

const app = express()
app.use(express.json())

new UserCrud(app)
new PostCrud(app)



createConnection().then(async () => {
    app.listen(5000, () => console.log('Server up at http://localhost:5000'));
}).catch(error => console.log(error));
