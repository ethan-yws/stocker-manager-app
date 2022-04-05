import create from 'zustand';
import { PRESET_SHARES } from '../common/constants';
import { IStore } from '../common/interfaces';

const useStore = create<IStore>((set) => ({
  balance: 100000, // <--- open account bonus
  addBalance: (credits: number) =>
    set((state) => ({ balance: state.balance + credits })),
  removeBalance: (credits: number) =>
    set((state) => ({ balance: state.balance - credits })),

  shareHoldings: [...PRESET_SHARES] as { ticker: string; quantity: number }[],
  addShareHoldings: (ticker: string, quantity: number) => {
    set((state) => {
      const targetIdx = state.shareHoldings.findIndex(
        (item) => item.ticker === ticker,
      );

      if (targetIdx === -1) {
        state.shareHoldings.push({ ticker: ticker, quantity: quantity });
      } else {
        state.shareHoldings[targetIdx].quantity += quantity;
      }
    });
  },

  removeShareHoldings: (ticker: string, quantity: number, price: number) => {
    set((state) => {
      const targetIdx = state.shareHoldings.findIndex(
        (item) => item.ticker === ticker,
      );

      if (targetIdx === -1) {
        alert(`Sorry, you don't have any ${ticker} shares`);
      } else {
        if (state.shareHoldings[targetIdx].quantity >= quantity) {
          state.shareHoldings[targetIdx].quantity -= quantity;
          state.addBalance(price * quantity);
        } else {
          alert("You don't have such amount of shares");
        }
      }
    });
  },
}));

export default useStore;
