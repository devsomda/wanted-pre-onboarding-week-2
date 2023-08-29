import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getIssueDetail } from '../api/request';
import { IissueDetail } from '../types/Issues';
import IssueCard from '../components/common/IssueCard';

export default function IssueDetail() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    const fetchData = () => {
      setIsLoading(true);
      getIssueDetail(issueNumber).then((res) => {
        setIssue(res.data);
        setIsLoading(false);
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <IssueCard issue={issue} />
          <p>{issue.body}</p>
        </>
      )}
    </div>
  );
}
