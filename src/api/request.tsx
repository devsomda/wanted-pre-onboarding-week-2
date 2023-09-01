import { octokitInstance } from './instance';
import { GITHUB_API_INFO } from '../constants';

const baseURL = `/repos/${GITHUB_API_INFO.OWNER}/${GITHUB_API_INFO.REPO_NAME}/issues`;

export const getReactRepoIssues = async (page: number) => {
  const res = await octokitInstance.request(`GET ${baseURL}`, {
    state: 'open',
    sort: 'comments',
    page: page,
  });

  return res;
};

export const getIssueDetail = async (issue_number: number) => {
  const res = await octokitInstance.request(`GET ${baseURL}/${issue_number}`);

  return res;
};
