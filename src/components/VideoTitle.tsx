import React from 'react';
import styled from '@emotion/styled';
import { useVideoProgress } from '@/hooks/useVideoProgress';

const Title = styled.h1`
  color: #35A29F;
  padding: 4rem 1rem 0.3rem;
  border-radius: 5px;
  margin: 0 auto;
  z-index: 1;
  text-align: center;
  max-width: 70%;
`;

const Author = styled.h2`
  font-size: 0.8rem;
  color: #ccc;
  margin-top: 0.2rem;
  padding-bottom: 1.5rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VideoTitle: React.FC = () => {
  const { videoTitle, channelTitle } = useVideoProgress();
  return (
    <Container>
      <Title>{videoTitle}</Title>
      <Author>by {channelTitle}</Author>
    </Container>
  );
};

export default VideoTitle; 