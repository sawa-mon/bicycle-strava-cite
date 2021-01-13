import React, { useState } from "react";
import styled from "styled-components";

export const EditAuthPage = () => {
  // process.env.REACT_APP_EDIT_PAGE_KEY;

  return (
    <div>
      <StyledDiv>パスワード認証ページ</StyledDiv>
      <input type="text" />
    </div>
  );
};

const StyledDiv = styled.div``;
