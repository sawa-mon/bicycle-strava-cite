import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { push } from "connected-react-router";
import { Button } from "../components/UIkit/Button";
import { signOut } from "../reducks/users/operations";

const Home = () => {
  const dispatch = useDispatch();

  //ここは最終的にデータベース参照
  const pageMenus = [
    {
      name: "長野県",
      value: "naganoprefecture",
    },
    {
      name: "愛知県",
      value: "aichiprefecture",
    },
    {
      name: "岐阜県",
      value: "gifuprefecture",
    },
  ];

  const getValue = () => {
    const element = document.getElementById("prefecture");
    const value = element.value;
    dispatch(push(`/${value}`));
  };

  return (
    <Section>
      <StyledContainer>
        <StyledTitle>今日はどこ行こう？</StyledTitle>
        <Styledcoment>バイクラックがあるとこ？</Styledcoment>
        <Styledcoment>そういう情報を確認するツールって？</Styledcoment>
        <Styledcoment>そんな時に使ってみてください</Styledcoment>
        <Styledcoment>すると、新しい発見があるかもしれません</Styledcoment>
        <Styledcoment>
          もし、まだ登録されてないポイントが
          <br />
          あったなら、追加することもできます
        </Styledcoment>
        <Styledcoment>エリアから選ぶ</Styledcoment>
        <StyledFrom>
          <StyledSelect id="prefecture">
            {pageMenus.map((pageMenu) => (
              <option
                key={pageMenu.number}
                value={pageMenu.value}
                id={pageMenu.id}
              >
                {pageMenu.name}
              </option>
            ))}
          </StyledSelect>
          <StyledSubmit
            type="button"
            value="確認する"
            onClick={() => getValue()}
          />
        </StyledFrom>
        <Button label="ログアウトする" onClick={() => dispatch(signOut())} />
      </StyledContainer>
    </Section>
  );
};

export default Home;

const Section = styled.div`
  height: 100vh;
  margin: auto;
`;

const StyledTitle = styled.h2`
  margin: 0;
  padding: 25px;
  display: grid;
  place-items: center;
`;
const Styledcoment = styled.h4`
  margin: 0;
  padding: 15px;
  display: grid;
  place-items: center;
  text-align: center;
`;

const StyledContainer = styled.div`
  display: grid;
  place-items: center;
`;

const StyledSelect = styled.select`
  width: 150px;
  height: 40px;
  font-size: 20px;
  background-color: #d1d1d1;
  border: none;
  outline: none;
`;

const StyledFrom = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 40px 0;
`;

const StyledSubmit = styled.input`
  width: 100px;
  height: 40px;
  border: none;
  background-color: #b5b5b5;
`;
