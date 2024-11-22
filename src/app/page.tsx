"use client";

import React from "react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { TitleColumn } from "@/components/TitleColumn";
import { useVideoProgress } from "@/hooks/useVideoProgress";
import { useSearchParams } from "next/navigation";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  height: fit-content;
  padding-top: 7rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const VideoContainer = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: fit-content;
`;

const TitlesContainer = styled.div`
  display: grid;
  grid-template-rows: 50% 50%;
  position: relative;
  max-height: 100%;
  overflow-y: hidden;
  width: 22%;
  border-radius: 0 10px 10px 0;
  border-top: 1px solid #da4167;
  border-right: 1px solid #da4167;
  border-bottom: 1px solid #da4167;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(50%);
    border-left: 10px solid #da4167;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const TitlePlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
`;

export default function Home() {
  const { videoChapters } = useVideoProgress();
  const searchParams = useSearchParams();
  const videoId = searchParams.get("videoId") || "jpScGRgLqFA";

  return (
    <Wrapper>
      <VideoContainer>
        <VideoPlayer videoId={videoId} />
      </VideoContainer>
      {videoChapters.length > 0 && (
        <TitlesContainer>
          <TitlePlaceholder />
          <TitleColumn />
        </TitlesContainer>
      )}
    </Wrapper>
  );
}
