import React from 'react';
import styled from 'styled-components';

export default function Loading() {
  return (
    <LoadingContainer>
      <h5>Loading...</h5>
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 다른 요소 위로 표시되도록 설정 */
`;
