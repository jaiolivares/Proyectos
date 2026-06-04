export type CrudFormMode = "create" | "edit";

export interface CrudEntity {
  Id: number;
}

export interface CrudService<TItem, TPayload> {
  fetchAll(): Promise<TItem[]>;
  create(payload: TPayload): Promise<TItem>;
  update(id: number, payload: TPayload): Promise<TItem>;
  remove(id: number): Promise<string>;
}
