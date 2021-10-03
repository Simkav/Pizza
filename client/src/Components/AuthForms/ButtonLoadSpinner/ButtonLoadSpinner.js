import React from "react";
import { css } from "@emotion/react";
import BarLoader from "react-spinners/BarLoader";
import cl from './ButtonLoadSpinner.module.css'

export default function ButtonLoadSpinner() {
  const override = css`
    display: block;
    margin: 0 0;
    border-color: red;
    width: 50%;
  `;

  return (
    <div className={cl.spinner_container}>
      <BarLoader color={'white'} css={override} size={100} />
    </div>
  );
}