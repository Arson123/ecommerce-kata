import express, { RequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import authRouter from "./presentation/auth.controller";
import productRouter from "./presentation/product.controller";
import orderRouter from './presentation/order.controller';

const pingHandler: RequestHandler = (_req, res) => {
  res.json({ ok: true });
};

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);

app.get("/api/v1/ping", pingHandler);
app.use('/api/v1/orders', orderRouter);


app.listen(env.port, () =>
  console.log(`API running on http://localhost:${env.port}`)
);
