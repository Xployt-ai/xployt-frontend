import NETWORK from './index';
import { creditEndpoints } from './credit';
import type { CreditTransaction } from '../models/credit';
import { parseISO, addMonths, isAfter, isBefore } from 'date-fns';

export interface ProStatus {
  is_pro: boolean;
  subscription_end_date?: string;
  subscription_start_date?: string;
  is_cancelled?: boolean;
  days_remaining?: number;
}

export interface SubscriptionResponse {
  message: string;
  credits_added?: number;
}

/**
 * Calculate subscription validity based on transaction history
 * Subscription is valid for 1 month from the last pro_monthly transaction
 */
export const calculateSubscriptionValidity = (transactions: CreditTransaction[]): {
  isValid: boolean;
  endDate: Date | null;
  startDate: Date | null;
  daysRemaining: number;
} => {
  // Find all pro_monthly transactions (subscription payments)
  const proMonthlyTransactions = transactions
    .filter(tx => tx.transaction_type.toLowerCase() === 'pro_monthly')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  if (proMonthlyTransactions.length === 0) {
    return {
      isValid: false,
      endDate: null,
      startDate: null,
      daysRemaining: 0,
    };
  }

  // Get the most recent pro_monthly transaction
  const lastPayment = proMonthlyTransactions[0];
  const startDate = parseISO(lastPayment.created_at);
  
  // Calculate end date (1 month from last payment)
  const endDate = addMonths(startDate, 1);
  
  // Check if current date is within the subscription period
  const now = new Date();
  const isValid = isAfter(now, startDate) && isBefore(now, endDate);
  
  // Calculate days remaining
  const daysRemaining = isValid 
    ? Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  console.log('Subscription validity calculation:', {
    lastPaymentDate: startDate,
    endDate,
    isValid,
    daysRemaining,
  });

  return {
    isValid,
    endDate,
    startDate,
    daysRemaining,
  };
};

export const subscriptionEndpoints = {
  /**
   * Get current user's pro subscription status
   * This checks both the backend status AND validates against transaction history
   * GET /api/v1/users/pro-status
   */
  async getProStatus(): Promise<ProStatus> {
    try {
      // Get backend status
      const backendStatus = await NETWORK.get('/users/pro-status');
      
      // Get transaction history to validate subscription period
      const transactions = await creditEndpoints.getCreditTransactions();
      
      // Calculate actual validity based on pro_monthly transactions
      const validity = calculateSubscriptionValidity(transactions);
      
      // Subscription is valid if:
      // 1. There's a pro_monthly transaction within the last month
      // Even if user cancelled, they keep access until end of paid period
      const actualIsPro = validity.isValid;
      
      console.log('Pro status check:', {
        backendIsPro: backendStatus.is_pro,
        calculatedIsPro: actualIsPro,
        daysRemaining: validity.daysRemaining,
      });

      return {
        is_pro: actualIsPro,
        subscription_end_date: validity.endDate?.toISOString(),
        subscription_start_date: validity.startDate?.toISOString(),
        is_cancelled: backendStatus.is_cancelled || false,
        days_remaining: validity.daysRemaining,
      };
    } catch (error) {
      console.error('Error fetching pro status:', error);
      throw error;
    }
  },

  /**
   * Subscribe user to pro plan ($20/month, 500 tokens)
   * Creates a pro_monthly transaction and grants access for 1 month
   * POST /api/v1/users/subscribe
   */
  async subscribeToPro(): Promise<SubscriptionResponse> {
    const response = await NETWORK.post('/users/subscribe', {});
    return response;
  },

  /**
   * Unsubscribe user from pro plan
   * Sets cancelled flag but subscription remains active until end of paid period
   * POST /api/v1/users/unsubscribe
   */
  async unsubscribeFromPro(): Promise<SubscriptionResponse> {
    const response = await NETWORK.post('/users/unsubscribe', {});
    return response;
  },
};
