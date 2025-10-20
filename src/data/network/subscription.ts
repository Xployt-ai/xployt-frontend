import NETWORK from './index';

export interface ProStatus {
  is_pro: boolean;
  is_cancelled?: boolean;
}

export interface SubscriptionResponse {
  message: string;
  credits_added?: number;
}

export const subscriptionEndpoints = {
  /**
   * Get current user's pro subscription status
   * GET /api/v1/users/pro-status
   */
  async getProStatus(): Promise<ProStatus> {
    try {
      const response = await NETWORK.get('/users/pro-status');
      console.log('Pro status:', response);
      return response;
    } catch (error) {
      console.error('Error fetching pro status:', error);
      throw error;
    }
  },

  /**
   * Subscribe user to pro plan ($20/month, 500 tokens)
   * POST /api/v1/users/subscribe
   */
  async subscribeToPro(): Promise<SubscriptionResponse> {
    const response = await NETWORK.post('/users/subscribe', {});
    return response;
  },

  /**
   * Unsubscribe user from pro plan
   * POST /api/v1/users/unsubscribe
   */
  async unsubscribeFromPro(): Promise<SubscriptionResponse> {
    const response = await NETWORK.post('/users/unsubscribe', {});
    return response;
  },
};
