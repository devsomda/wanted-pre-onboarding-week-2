import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getIssueDetail } from '../api/request';
import { IissueDetail } from '../types/Issues';
import styled from 'styled-components';

export default function IssueDetail() {
  const [issue, setIssue] = useState<IissueDetail>({
    number: -1,
    title: '',
    user: { avatar_url: '', login: '' },
    created_at: '',
    comments: -1,
    id: -1,
    body: '',
  });

  const location = useLocation();
  const issueNumber = parseInt(location.pathname.replace('/', ''));

  useEffect(() => {
    getIssueDetail(issueNumber).then((res) => {
      setIssue(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div>
      <p>#{issue.number}</p>
      <p>제목: {issue.title}</p>
      <ProfileImg src={issue.user.avatar_url} alt='' />
      <p>작성자: {issue.user.login}</p>
      <p>작성일: {issue.created_at}</p>
      <p>코멘트: {issue.comments}</p>
      <hr />
      <p>{issue.body}</p>
    </div>
  );
}

const ProfileImg = styled.img`
  width: 50px;
  border-radius: 50%;
`;
