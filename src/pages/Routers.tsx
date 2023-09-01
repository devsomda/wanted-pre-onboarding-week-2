import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import IssueList from './IssueList';
import IssueDetail from './IssueDetail';
import Error from './Error';
import { IssueListProvider } from '../contexts/IssueContext';

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <IssueListProvider>
              <IssueList />
            </IssueListProvider>
          }
        />
        <Route path='/:issue_number' element={<IssueDetail />} />
        <Route path='/error' element={<Error />} />
        <Route path='/*' element={<Navigate to='/error' />} />
      </Routes>
    </BrowserRouter>
  );
}
