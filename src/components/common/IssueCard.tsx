import React from 'react';
import { IissueSummary, IissueDetail } from '../../types/Issues';
import styled from 'styled-components';

interface Iprops {
  issue: IissueDetail | IissueSummary;
}

export default function IssueCard(props: Iprops) {
  const { issue } = props;

  const parts = issue.created_at.split('T');
  const createDate = parts[0];

  return (
    <CardContainer>
      <CardLeft>
        <p>#{issue.number}</p>
        <h3>{issue.title}</h3>
        <CardText>Created At: {createDate}</CardText>
        <CardText>Comments: {issue.comments}</CardText>
      </CardLeft>
      <CardRight>
        <ProfileImg src={issue.user.avatar_url} alt='' />
        <CardText>{issue.user.login}</CardText>
      </CardRight>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CardLeft = styled.div`
  width: 80%;
`;

const CardRight = styled.div`
  // display: flex;
  text-align: center;
  width: 20%;
`;

const CardText = styled.p`
  margin: 0;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
