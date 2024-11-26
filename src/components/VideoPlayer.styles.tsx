import styled from "@emotion/styled";

export const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  max-width: 100%;
  width: 100%;
  border-top-left-radius: 10px; /* Adjust the radius as needed */
  border-bottom-left-radius: 10px; /* Adjust the radius as needed */
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;