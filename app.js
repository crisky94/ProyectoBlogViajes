import express from "express";
const app = express();
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import getPool from "./src/db/getPool.js";

app.use(express.json());

app.listen(process.env.PORT, ()=>{
    console.log(`El servidor esta escuchando en el puerto ${process.env.PORT}...`)
})