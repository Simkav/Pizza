import React from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import cl from './IngridientsSpinner.module.css'

function IngridientsSpinner() {
  const override = css`
    display: block;
    margin: 0 0;
  `;

  return (
    <div className={cl.spinner_container}>
      <ClipLoader color={'teal'} css={override} size={100} />
    </div>
  );
}

export default IngridientsSpinner;
