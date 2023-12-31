import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getReactRepoIssues } from '../api/request';
import { IissueSummary, IissueList } from '../types/Issues';
import IssueCard from '../components/common/IssueCard';
import Loading from '../components/common/Loading';
import useObserver from '../components/hooks/useObserver';
import AdImage from '../components/IssueList/AdImage';
import { INFINITE_SCROLL_STANDARD } from '../constants';
import { useIssueListContext } from '../contexts/IssueContext';

export default function IssueList() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  // const [issueList, setIssueList] = useState<IissueList>([]);
  const { issueList, setIssueList } = useIssueListContext();

  const callback = () => setPage((prevPage) => prevPage + 1);
  useObserver(isLoading, callback);

  useEffect(() => {
    if (page !== 0) {
      fetchData(page);
    }
  }, [page]);

  const fetchData = (pageNumber: number) => {
    setIsLoading(true);
    getReactRepoIssues(pageNumber)
      .then((res) => {
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

        // setIssueList((prev) => [...prev, ...extractedData]);
        setIssueList((prev) => [...prev, ...extractedData]);
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };

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
      {isLoading && <Loading />}
      {issueList.map((issue, idx) => (
        <React.Fragment key={issue.id}>
          {(idx + 1) % 4 === 0 ? (
            // 네 번째 셀인 경우 이슈 정보 하단 광고 이미지
            <>
              <IssueWrapper href={`/${issue.number}`} key={issue.id}>
                <IssueCard issue={issue} />
                {idx}
              </IssueWrapper>
              <hr />
              <AdImage />
            </>
          ) : (
            <>
              <IssueWrapper href={`/${issue.number}`} key={issue.id}>
                <IssueCard issue={issue} />
                {idx}
              </IssueWrapper>
              <hr />
            </>
          )}
        </React.Fragment>
      ))}
      <InfinitScrollPoint id={INFINITE_SCROLL_STANDARD}></InfinitScrollPoint>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 4em;
  background: #e9e9e9;
`;

const IssueWrapper = styled.a`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

const InfinitScrollPoint = styled.div`
  height: 20px;
`;
