import NETWORK from './index';
import type {Repo} from '../models/repo';

export const repoEndpoints = {
  async getRepos(): Promise<Repo[]> {
    const response = await NETWORK.get('/repositories');
    return response.data;
  },

  async linkRepo(repo: Repo): Promise<Repo> {

   const response = await NETWORK.post('/repositories', {
     github_repo_id: repo.github_repo_id,
     name: repo.name,
     private: repo.private
   });
    if (response.status == 422) throw new Error(
      `Failed to link repository: ${response.detail.msg}\n${response.detail.loc}\n${response.detail.type}`
    )
    return response.data;
  }
};
