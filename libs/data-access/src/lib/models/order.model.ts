export interface Order {
  id: number;
  customer: string;
  nbDays: number;
  tjm: number;
  tauxTva: number;
  totalHt: number;
  totalTtc: number;
}

export type CreateOrder = Omit<Order, 'id' | 'totalHt' | 'totalTtc'>;

export type UpdateOrder = Omit<Order, 'totalHt' | 'totalTtc'>;


