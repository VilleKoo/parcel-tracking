import React from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/constants';
import animationData from '../assets/bear-loader.json';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & p {
    margin-bottom: calc(var(--spacing) * 6);
  }
`;

const LoadingText = styled.h2`
  text-align: center;
`;

export default function Loading() {
  const appData = useApp();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <LoadingContainer>
      <LoadingText>{translations.loading[appData.lang]}</LoadingText>
      <Lottie options={defaultOptions} height={400} width={400} />
    </LoadingContainer>
  );
}
