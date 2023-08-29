import React from 'react';
import { IissueSummary, IissueDetail } from '../../types/Issues';
import styled from 'styled-components';

interface Iprops {
  issue: IissueDetail | IissueSummary;
}

export default function IssueCard(props: Iprops) {
  const { issue } = props;

  return (
    <div>
      <p>#{issue.number}</p>
      <p>제목: {issue.title}</p>
      <ProfileImg src={issue.user.avatar_url} alt='' />
      <p>작성자: {issue.user.login}</p>
      <p>작성일: {issue.created_at}</p>
      <p>코멘트: {issue.comments}</p>
      <hr />
    </div>
  );
}

const ProfileImg = styled.img`
  width: 50px;
  border-radius: 50%;
`;
