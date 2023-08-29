import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getReactRepoIssues } from '../api/request';
import { IissueList } from '../types/Issues';

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
      const extractedData = res.data.map((issue) => ({
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
        <div key={issue.id}>
          <p>이슈 번호: {issue.number}</p>
          <p>제목: {issue.title}</p>
          <ProfileImg src={issue.user.avatar_url} alt='' />
          <p>작성자: {issue.user.login}</p>
          <p>작성일: {issue.created_at}</p>
          <p>댓글 수: {issue.comments}</p>
          <hr />
        </div>
      ))}
    </Wrapper>
  );
}
const Wrapper = styled.section`
  padding: 4em;
  background: lightgray;
`;

const ProfileImg = styled.img`
  width: 50px;
  border-radius: 50%;
`;
