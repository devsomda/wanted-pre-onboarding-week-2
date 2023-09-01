import React from 'react';
import styled from 'styled-components';

export default function AdImage() {
  return (
    <AdImageContainer>
      <AdImageWrapper href='https://www.wanted.co.kr/ '>
        <AdText>[AD]</AdText>
        <img
          src='https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100'
          alt='ad-image'
        />
      </AdImageWrapper>
      <hr />
    </AdImageContainer>
  );
}

const AdImageContainer = styled.div`
  position: relative;
`;

const AdText = styled.p`
  text-decoration: none;
  font-size: 0.7rem;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
`;

const AdImageWrapper = styled.a`
  display: flex;
  justify-content: center;
  background-color: white;
`;
