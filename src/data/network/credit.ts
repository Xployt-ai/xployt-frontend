import NETWORK from './index';
import type { CreditTopup ,CreditBalance ,CreditTransaction} from '../models/credit';


export const creditEndpoints = {

  async creditTopup(amount: number): Promise<CreditTopup> {
    const response = await NETWORK.post('/credits/topup', { amount });
    return response.data;
  },

  async getCreditBalance(): Promise<CreditBalance> {
    const response = await NETWORK.get('/credits/balance');
    return response.data;
  },

  async getCreditTransactions(): Promise<CreditTransaction[]> {
    const response = await NETWORK.get('/credits/transactions');
    return response.data;
  },
  async getCreditTransactionsById(transaction_id: string): Promise<CreditTransaction> {
    const response = await NETWORK.get(`/credits/transactions/${transaction_id}`);
    return response.data;
  },

};
