import { Router, Request, Response } from "express";

export const pingRouter: Router = Router();

pingRouter.get("/ping", (req: Request, res: Response): void => {
  res.json({ ok: true });
});
