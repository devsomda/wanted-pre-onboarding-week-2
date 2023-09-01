import React from 'react';
import { INFINITE_SCROLL_STANDARD } from '../../constants';

type IObserverCallback = () => void;

export default function useObserver(isLoading: boolean, callback: IObserverCallback) {
  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
      callback();
    }
  };

  const observer = new IntersectionObserver(handleObserver, {
    threshold: 1, //  Intersection Observer의 옵션, 0일 때는 교차점이 한 번만 발생해도 실행, 1은 모든 영역이 교차해야 콜백 함수가 실행.
  });
  const observerTarget = document.getElementById(INFINITE_SCROLL_STANDARD);
  if (observerTarget) {
    observer.observe(observerTarget);
  }

  return () => {
    if (observerTarget) {
      observer.unobserve(observerTarget);
    }
  };
}
