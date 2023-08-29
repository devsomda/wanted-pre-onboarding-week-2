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

  /*
  광고를 구현하는 방식에 대한 고민
  1. fetchData()를 할 때, array.splice를 사용해 
  받아온 배열의 다섯번째 인덱스에 광고 이미지를 추가하는 방식 
    -> 배열이 가지고 있어야할 issue 정보를 가지지 못하는 문제
  2. issue 4개 + 광고 1개를 묶는 컴포넌트를 생성하는 방식 
    -> 불필요한 depth가 생긴다 판단 됨
  3. 인덱스가 다섯번째 일 때 광고 + issue 를 함게 표현하는 방식 
    -> 채택하였으나, 광고가 하나가 아니라 여러개의 배열로 들어올 때 확장성이 다소 떨어질 것으로 예상 됨
  */

  return (
    <Wrapper>
      {issueList.map((issue, idx) => (
        <React.Fragment key={issue.id}>
          {(idx + 1) % 5 === 0 ? (
            // 다섯 번째 셀인 경우 광고 이미지와 이슈 정보를 함께 출력
            <>
              <div>
                <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkOlAl9iqWuqE0cvz4agjPYd9zFE2i3IRL3w&usqp=CAU'
                  alt=''
                />
                <hr />
              </div>
              <IssueWrapper href={`/${issue.number}`} key={issue.id}>
                <IssueCard issue={issue} />
              </IssueWrapper>
            </>
          ) : (
            // 다섯 번째 셀이 아닌 경우 이슈 정보만 출력
            <IssueWrapper href={`/${issue.number}`} key={issue.id}>
              <IssueCard issue={issue} />
            </IssueWrapper>
          )}
        </React.Fragment>
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
