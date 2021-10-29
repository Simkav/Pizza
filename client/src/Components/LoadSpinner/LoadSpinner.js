import React, { memo } from 'react';
import { css } from '@emotion/react';
import GridLoader from 'react-spinners/GridLoader';
import cl from './LoadSpinner.module.css';

export default memo(function LoadSpinner () {
  const override = css`
    display: block;
    margin: 0 0;
    border-color: red;
  `;

  return (
    <div className={cl.spinner_container}>
      <GridLoader color={'teal'} css={override} size={100} />
    </div>
  );
});
