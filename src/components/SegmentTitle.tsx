"use client";

import styled from "@emotion/styled";

interface TitleProps {
  isActive: boolean;
  isPast: boolean;
  isLast: boolean;
}

const SegmentTitle = styled.div<TitleProps>`
  color: ${({ isActive, isPast }) =>
    isActive ? "#f8f9fa" : isPast ? "#66666e" : "#9999a1"};
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  height: 65px;
  width: 100%;
  margin: 0;
  position: relative;
  font-size: 1.5rem;
  z-index: 1;
  width: 100%;
  border-top: 1px dashed rgba(160, 21, 62, 0.5);
  border-bottom: ${({ isLast }) => (isLast ? "1px solid rgba(160, 21, 62, 0.5)" : "none")};
  padding: 10px 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;

export default SegmentTitle;
