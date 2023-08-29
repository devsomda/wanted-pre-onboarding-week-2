import { octokitInstance } from './instance';
import { GITHUB_API_INFO } from '../constants';

export const getReactRepoIssues = async (page: number) => {
  const res = await octokitInstance.request('GET /repos/{owner}/{repo}/issues', {
    owner: GITHUB_API_INFO.OWNER,
    repo: GITHUB_API_INFO.REPO_NAME,
    state: 'open',
    sort: 'comments',
    page: page,
  });

  return res;
};
