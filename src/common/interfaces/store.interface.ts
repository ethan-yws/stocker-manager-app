export interface IStore {
  balance: number;
  addBalance: (credits: number) => void;
  removeBalance: (credits: number) => void;
  shareHoldings: { ticker: string; quantity: number }[];
  addShareHoldings: (ticker: string, quantity: number) => void;
  removeShareHoldings: (
    ticker: string,
    quantity: number,
    price: number,
  ) => void;
}
