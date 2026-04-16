import { Request, Response } from "express";
import { respuestaOk } from "../dtos/response.dto";
import type { StandardResponse } from "../dtos/response.dto";

export class ItemController {
    public async all(req: Request, res: Response<StandardResponse<any[]>>): Promise<Response<StandardResponse<any[]>>> {
        const items = await this.getItems();
        return res.status(200).json(respuestaOk<any[]>(items));
    }

    public async getItems() {
        // Simula una consulta a la base de datos o a otro servicio
        return [
            {
                id: '1',
                name: 'Item 1',
                createdAt: new Date().toISOString()
            },
            {
                id: '2',
                name: 'Item 2',
                createdAt: new Date().toISOString()
            },
            {
                id: '3',
                name: 'Item 3',
                createdAt: new Date().toISOString()
            }
        ] as any;
    }

}
