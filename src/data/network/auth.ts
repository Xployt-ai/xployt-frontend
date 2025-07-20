import NETWORK from './index';
import type { GitHubAuthUrl, AuthResponse } from '../types/auth';
import type { User } from '../models/user';

export const authEndpoints = {
  async getGitHubLoginUrl(): Promise<GitHubAuthUrl> {
    const response = await NETWORK.get('/auth/github');
    return response.data;
  },

  async handleGitHubCallback(code: string): Promise<AuthResponse> {
    const response = await NETWORK.get(`/auth/github/callback?code=${code}`);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await NETWORK.get('/auth/me');
    return response.data;
  },
};
