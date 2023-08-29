import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import IssueList from './IssueList';
import IssueDetail from './IssueDetail';

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<IssueList />} />
        <Route path='/:issue_number' element={<IssueDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
