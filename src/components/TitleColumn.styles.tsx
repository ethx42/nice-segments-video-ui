import styled from "@emotion/styled";

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  transition: transform 0.5s ease-in-out;
  position: absolute;
  width: 100%;
  top: 47.4%;
  left: 0;
`;

export const TitleList = styled.div`
  display: flex;
  flex-direction: column;
  transition: transform 0.5s ease-in-out;
`;

export const TitleWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const ProgressBar = styled.div<{ progress: number; isLast: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ progress }) => progress}%;
  background: repeating-linear-gradient(
    45deg,
    rgba(218, 22, 103, 0.2),
    rgba(218, 22, 103, 0.4) 10px,
    transparent 10px,
    transparent 20px
  );
  z-index: 0;
`;
