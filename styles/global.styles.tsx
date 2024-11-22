'use client';

/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';
import React from 'react';

const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background: radial-gradient(circle at 70% 110%, #082e4b, #062741, #042137, #031a2e, #021425, #010e1c, #010813, #00040b, #000205, #000101, #000000, #000000); /* made at https://learnui.design/tools/gradient-generator.html */
        padding: 0 2rem;
        height: 100vh;
      }
    `}
  />
);

export default GlobalStyles;