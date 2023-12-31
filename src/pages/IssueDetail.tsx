import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getIssueDetail } from '../api/request';
import { IissueDetail } from '../types/Issues';
import IssueCard from '../components/common/IssueCard';
import Loading from '../components/common/Loading';

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

  const navigate = useNavigate();
  const location = useLocation();
  const issueNumber = parseInt(location.pathname.replace('/', ''));

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      getIssueDetail(issueNumber)
        .then((res) => {
          setIssue(res.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
        })
        .catch(() => {
          setIsLoading(false);
          alert('잘못된 접근입니다.');
          navigate('/error');
        });
    };
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <IssueCard issue={issue} />
          <ReactMarkdown
            components={{
              img: ({ node, ...props }) => <img style={{ maxWidth: '100%' }} {...props} alt='' />,
            }}
          >
            {issue.body}
          </ReactMarkdown>
        </>
      )}
    </div>
  );
}
