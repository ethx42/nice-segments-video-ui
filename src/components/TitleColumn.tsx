"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Column,
  TitleList,
  TitleWrapper,
  ProgressBar,
} from "./TitleColumn.styles";
import SegmentTitle from "./SegmentTitle";
import { useVideoProgress } from "../hooks/useVideoProgress";

interface Segment {
  start: number;
  end: number;
  title: string;
}

const TitleHeight = 65;

export const TitleColumn: React.FC = () => {
  const { currentTime, videoChapters, setCurrentTime } = useVideoProgress();
  const [activeSegment, setActiveSegment] = useState<Segment | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Find the current segment based on the current time of the video.
    const currentSegment = videoChapters.find(
      (segment: { start: number; end: number }) =>
        currentTime >= segment.start && currentTime < segment.end
    );

    setActiveSegment(currentSegment || null);

    // If a current segment is found, adjust the list's transform to scroll to the active segment.
    if (currentSegment && listRef.current) {
      const index = videoChapters.indexOf(currentSegment);
      const offset = index * TitleHeight + 7;
      listRef.current.style.transform = `translateY(-${offset}px)`;
    }
  }, [currentTime, videoChapters]);

  if (videoChapters.length === 0) {
    return null;
  }

  return (
    <Column>
      <TitleList ref={listRef}>
        {videoChapters.map((segment: Segment, index: number) => {
          const isActive = activeSegment?.title === segment.title;
          const isPast = currentTime >= segment.end;

          return (
            <TitleWrapper
              key={
                typeof segment.title === "string" ||
                typeof segment.title === "number"
                  ? segment.title
                  : index
              }
            >
              {isActive && (
                <ProgressBar
                  key={segment.title}
                  progress={
                    ((currentTime - segment.start) /
                      (segment.end - segment.start)) *
                    100
                  }
                  isLast={index === videoChapters.length - 1}
                />
              )}
              <SegmentTitle
                isActive={isActive}
                isPast={isPast}
                isLast={index === videoChapters.length - 1}
                onClick={() => setCurrentTime(segment.start)}
              >
                {segment.title}
              </SegmentTitle>
            </TitleWrapper>
          );
        })}
      </TitleList>
    </Column>
  );
};
