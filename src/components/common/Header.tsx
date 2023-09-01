import React from 'react';
import { GITHUB_API_INFO } from '../../constants';
import { styled } from 'styled-components';

export default function Header() {
  return (
    <Title>
      <h3>
        {GITHUB_API_INFO.OWNER}/{GITHUB_API_INFO.REPO_NAME}
      </h3>
      <hr />
    </Title>
  );
}

const Title = styled.header`
  font-size: 2em;
  text-align: center;
  font-weight: bold;
  margin-bottom: 0.5em;
`;
