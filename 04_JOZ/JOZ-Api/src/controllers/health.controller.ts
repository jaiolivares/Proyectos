import { Request, Response } from 'express';

export class HealthController {
    public getHealth(req: Request, res: Response): Response {
        return res.status(200).json({ status: 'UP' });
    }
}