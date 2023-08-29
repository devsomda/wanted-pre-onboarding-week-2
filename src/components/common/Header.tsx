import React from 'react';
import { GITHUB_API_INFO } from '../../constants';
import { styled } from 'styled-components';

export default function Header() {
  return (
    <Title>
      {GITHUB_API_INFO.OWNER}/{GITHUB_API_INFO.REPO_NAME}
    </Title>
  );
}

const Title = styled.header`
  font-size: 2em;
  text-align: center;
  font-weight: bold;
  font-family: 'Times New Roman';
  margin-bottom: 0.5em;
`;
