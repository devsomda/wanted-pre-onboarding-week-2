import React, { createContext, useContext, useState } from 'react';
import { IissueSummary } from '../types/Issues';

type IssueListContextValue = {
  issueList: IissueSummary[];
  setIssueList: React.Dispatch<React.SetStateAction<IissueSummary[]>>;
};

const IssueListContext = createContext<IssueListContextValue | undefined>(undefined);

export function IssueListProvider({ children }: { children: React.ReactNode }) {
  const [issueList, setIssueList] = useState<IissueSummary[]>([]);

  return (
    <IssueListContext.Provider value={{ issueList, setIssueList }}>
      {children}
    </IssueListContext.Provider>
  );
}

export function useIssueListContext() {
  const context = useContext(IssueListContext);
  if (!context) {
    throw new Error('useIssueListContext must be used within an IssueListProvider');
  }
  return context;
}
