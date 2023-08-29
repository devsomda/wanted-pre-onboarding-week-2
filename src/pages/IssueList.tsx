import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import IssueCard from '../components/common/IssueCard';
import { getReactRepoIssues } from '../api/request';
import { IissueSummary, IissueList } from '../types/Issues';

export default function IssueList() {
  const [issueList, setIssueList] = useState<IissueList>([
    {
      number: -1,
      title: '',
      user: { avatar_url: '', login: '' },
      created_at: '',
      comments: -1,
      id: -1,
    },
  ]);

  useEffect(() => {
    getReactRepoIssues(0).then((res) => {
      const extractedData = res.data.map((issue: IissueSummary) => ({
        number: issue.number,
        title: issue.title,
        user: {
          avatar_url: issue.user ? issue.user.avatar_url : '',
          login: issue.user ? issue.user.login : '',
        },
        created_at: issue.created_at,
        comments: issue.comments,
        id: issue.id,
      }));
      setIssueList(extractedData);
    });
  }, []);

  return (
    <Wrapper>
      {issueList.map((issue) => (
        <IssueWrapper href={`/${issue.number}`} key={issue.id}>
          <IssueCard issue={issue} />
        </IssueWrapper>
      ))}
    </Wrapper>
  );
}
const Wrapper = styled.section`
  padding: 4em;
  background: lightgray;
`;

const IssueWrapper = styled.a`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;
