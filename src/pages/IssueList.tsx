import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import IssueCard from '../components/common/IssueCard';
import { getReactRepoIssues } from '../api/request';
import { IissueSummary, IissueList } from '../types/Issues';
import Loading from '../components/common/Loading';

export default function IssueList() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [issueList, setIssueList] = useState<IissueList>([]);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1, //  Intersection Observer의 옵션, 0일 때는 교차점이 한 번만 발생해도 실행, 1은 모든 영역이 교차해야 콜백 함수가 실행.
    });
    const observerTarget = document.getElementById('bottom-of-page');
    if (observerTarget) {
      observer.observe(observerTarget);
    }
    return () => {
      if (observerTarget) {
        observer.unobserve(observerTarget);
      }
    };
  }, []);

  // 첫번째 useEffect와 충돌 방지
  /* 
  FIXME:
  page의 초기값을 1로 해두었을 때,
  첫번째 useEffect가 바로 실행되면서 초기 화면부터 페이지 1,2가 한번에 호출 되는
  문제가 있었습니다.
  초기값을 0으로 바꾸고, 0일 때는 실행이 안되게 함으로서 최초에 두 번 불러와지는
  문제는 임시적으로 막았으나
  매번 조건을 검사해야하는 게 옳은가? 하는 생각이 듭니다.
  */
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
      {issueList.map((issue, idx) => (
        <React.Fragment key={issue.id}>
          {(idx + 1) % 5 === 0 ? (
            // 다섯 번째 셀인 경우 광고 이미지와 이슈 정보를 함께 출력
            <>
              <AdImageWrapper href='https://www.wanted.co.kr/ '>
                <img
                  src='https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100'
                  alt='ad-image'
                />
              </AdImageWrapper>
              <hr />
              <IssueWrapper href={`/${issue.number}`} key={issue.id}>
                <IssueCard issue={issue} />
              </IssueWrapper>
              <hr />
            </>
          ) : (
            // 다섯 번째 셀이 아닌 경우 이슈 정보만 출력
            <>
              <IssueWrapper href={`/${issue.number}`} key={issue.id}>
                <IssueCard issue={issue} />
              </IssueWrapper>
              <hr />
            </>
          )}
        </React.Fragment>
      ))}
      {isLoading && <Loading />}
      <div id='bottom-of-page' style={{ height: '10px' }}></div>
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

const AdImageWrapper = styled.a`
  display: flex;
  justify-content: center;
`;
