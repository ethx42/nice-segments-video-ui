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
        background: radial-gradient(circle at top left, #1b2330, #111827, #0d1117);
        color: #333;
        padding: 0 2rem;
      }
    `}
  />
);

export default GlobalStyles;