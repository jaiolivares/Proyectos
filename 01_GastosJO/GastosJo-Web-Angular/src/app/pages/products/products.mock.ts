export const productList: Product[] = [
  { id: 1, name: "producto 1", price: 10, activo: true },
  { id: 2, name: "producto 2", price: 10 },
  { id: 3, name: "producto 3", price: 10 },
  { id: 4, name: "producto 4", price: 10, activo: false },
  { id: 5, name: "producto 5", price: 10 },
  { id: 6, name: "producto 6", price: 10 },
  { id: 7, name: "producto 7", price: 10 },
  { id: 8, name: "producto 8", price: 10 },
];

export interface Product {
  id: number | string;
  name: string;
  price: number;
  activo?: boolean;
}
