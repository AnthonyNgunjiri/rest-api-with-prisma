import express from "express";
import productRoute from "./routers/routeProduct.js"
import { config } from "dotenv";

const app = express();
app.use(express.json());
app.use("/product" , productRoute);
config();

app.listen(3008,()=>{
    console.log("lets  code ,shall we?");
})
