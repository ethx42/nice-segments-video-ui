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
  border-right: 1px solid rgba(255, 240, 120, 1);
  box-shadow: 0 0 5px rgba(255, 240, 120, 0.5), 0 0 20px rgba(255, 65, 145, 0.5), inset 0 0 10px rgba(255, 240, 120, 0.3);
  animation: glare 1.5s infinite alternate;

  @keyframes glare {
    0% {
      box-shadow: 0 0 10px rgba(255, 240, 120, 0.5), 0 0 20px rgba(255, 65, 145, 0.5), inset 0 0 5px rgba(255, 240, 120, 0.2);
    }
    100% {
      box-shadow: 0 0 11px rgba(255, 240, 120, 1), 0 0 22px rgba(255, 65, 145, 1), inset 0 0 10px rgba(255, 240, 120, 0.5);
    }
  }
`;

export default ProgressBar; 