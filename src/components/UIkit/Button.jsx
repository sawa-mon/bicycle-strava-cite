import React from "react";
import styled from "styled-components";

export const Button = (props) => {
  return (
    <StyledButton
      plane={props.plane}
      type={"button"}
      onClick={props.onClick && (() => props.onClick())}
    >
      {props.label}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  background: ${(props) => (props.plane ? "#d8d8d8a8" : "#47c9f3b5")};

  display: grid;
  place-items: center;
  width: 230px;
  height: 30px;
  border: none;
  border-radius: 15px;
  /* border-style: groove; */
  font-size: 15px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    opacity: 0.7;
  }
`;
