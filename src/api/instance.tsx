import React from 'react';
import { Octokit } from 'octokit';

const API_KEY = process.env.REACT_APP_API_ACCESS_KEY;

export const octokitInstance = new Octokit({
  auth: API_KEY,
});
