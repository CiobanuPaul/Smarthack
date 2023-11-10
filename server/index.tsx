//oare va merge?
import express, { Express, Request, Response } from "express";

const app: Express = express()

let gc: Number = 0;

app.get('/', (req: Request, res: Response) => {
    res.send("Hello Hell!")
});

app.listen(3000);