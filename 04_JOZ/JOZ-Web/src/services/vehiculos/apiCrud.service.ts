import http from "../../api/httpClient";
import { ApiResponse } from "../../models/api";

type ResourceMessages = {
  singular: string;
  plural: string;
};

export class ApiCrudService<TItem, TPayload> {
  constructor(
    private readonly resourcePath: string,
    private readonly messages: ResourceMessages,
    private readonly httpClient = http,
  ) {}

  async fetchAll(): Promise<TItem[]> {
    try {
      const response = await this.httpClient.get<ApiResponse<TItem[]>>(`${this.resourcePath}/obtenerTodos`);
      return response.data.Dato ?? [];
    } catch (error: any) {
      if (error?.response?.status === 404) {
        return [];
      }

      throw new Error(error?.response?.data?.Mensaje || error?.message || `No fue posible cargar ${this.messages.plural}`);
    }
  }

  async create(payload: TPayload): Promise<TItem> {
    try {
      const response = await this.httpClient.post<ApiResponse<TItem>>(`${this.resourcePath}/crear`, payload);
      if (!response.data.Dato) {
        throw new Error(response.data.Mensaje || `La API no retornó ${this.messages.singular} creado`);
      }

      return response.data.Dato;
    } catch (error: any) {
      throw new Error(error?.response?.data?.Mensaje || error?.message || `No fue posible crear ${this.messages.singular}`);
    }
  }

  async update(id: number, payload: TPayload): Promise<TItem> {
    try {
      const response = await this.httpClient.patch<ApiResponse<TItem>>(`${this.resourcePath}/actualizar/${id}`, payload);
      if (!response.data.Dato) {
        throw new Error(response.data.Mensaje || `La API no retornó ${this.messages.singular} actualizado`);
      }

      return response.data.Dato;
    } catch (error: any) {
      throw new Error(error?.response?.data?.Mensaje || error?.message || `No fue posible actualizar ${this.messages.singular}`);
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const response = await this.httpClient.delete<ApiResponse<string>>(`${this.resourcePath}/eliminar/${id}`);
      return response.data.Mensaje || response.data.Dato || `${this.messages.singular} eliminado`;
    } catch (error: any) {
      throw new Error(error?.response?.data?.Mensaje || error?.message || `No fue posible eliminar ${this.messages.singular}`);
    }
  }
}
