import styled from "@emotion/styled";

interface ProgressBarProps {
  progress: number;
  isLast: boolean;
}

const ProgressBar = styled.div<ProgressBarProps>`
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

export default ProgressBar; 