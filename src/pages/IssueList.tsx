import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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
        <IssueCard href={`/${issue.number}`} type='button' key={issue.id}>
          <p>#{issue.number}</p>
          <p>제목: {issue.title}</p>
          <ProfileImg src={issue.user.avatar_url} alt='' />
          <p>작성자: {issue.user.login}</p>
          <p>작성일: {issue.created_at}</p>
          <p>코멘트: {issue.comments}</p>
          <hr />
        </IssueCard>
      ))}
    </Wrapper>
  );
}
const Wrapper = styled.section`
  padding: 4em;
  background: lightgray;
`;

const IssueCard = styled.a`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 50px;
  border-radius: 50%;
`;
