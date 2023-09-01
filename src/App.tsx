import React from 'react';
import Header from './components/common/Header';
import Routers from './pages/Routers';
import styled from 'styled-components';

function App() {
  return (
    <AppWrapper>
      <Header />
      <Routers />
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 1rem auto;
  padding: 1rem;
  border: 1px solid lightgray;
  font-family: 'Times New Roman';
`;
