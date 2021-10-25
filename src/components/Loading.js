import React from "react";
import { SpinnerDiamond } from "spinners-react";
import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & p {
    margin-bottom: 24px;
  }
`;

export default function Loading() {
  return (
    <LoadingContainer>
      <p>Loadings events</p>
      <SpinnerDiamond color={"#ff8000"} secondaryColor={"#394a58"} />
    </LoadingContainer>
  );
}
