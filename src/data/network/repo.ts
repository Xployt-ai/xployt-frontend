import NETWORK from './index';
import type {
  Repo,
  LinkRepoRequest,
  LinkRepoResponse,
  CloneRepoResponse,
  PullRepoResponse
} from '../models/repo';

export const repoEndpoints = {
  /**
   * GET /api/v1/repositories
   * List all of the user's GitHub repositories and show which ones are linked
   */
  async getRepos(): Promise<Repo[]> {
    const response = await NETWORK.get('/repositories');
    return response.data;
  },

  /**
   * POST /api/v1/repositories/{repo_name}/clone
   * Clones a repository to the local file system
   * This implicitly checks for user's permission by using their token
   */
  async cloneRepo(repoName: string): Promise<CloneRepoResponse> {
    const response = await NETWORK.post(
      `/repositories/${repoName}/clone`,
      {}
    );
    
    if (response.status === 422) {
      throw new Error('Validation Error: Invalid repository name');
    }
    
    return response.data;
  },

  /**
   * POST /api/v1/repositories/{repo_name}/pull
   * Pulls the latest changes for a locally cloned repository
   */
  async pullRepo(repoName: string): Promise<PullRepoResponse> {
    const response = await NETWORK.post(
      `/repositories/${repoName}/pull`,
      {}
    );
    
    if (response.status === 422) {
      throw new Error('Validation Error: Invalid repository name');
    }
    
    return response.data;
  }
};
