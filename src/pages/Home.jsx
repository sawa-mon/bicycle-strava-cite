import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { push } from "connected-react-router";
import { Button, SelectBox } from "../components/UIkit";
import { signOut } from "../reducks/users/operations";

const Home = () => {
  const dispatch = useDispatch();

  return (
    <Section>
      <StyledContainer>
        <StyledTitle>今日はどこ行こう？</StyledTitle>
        <Styledcoment>
          バイクラックがあるとこ？
          <br />
          そういう情報を確認するツールって？
        </Styledcoment>
        <Styledcoment>
          そんな時に使ってみてください
          <br />
          すると、新しい発見があるかもしれません
        </Styledcoment>
        <Styledcoment>
          新たな発見を情報ページの投稿機能を使って
          <br />
          コメントを残すこともできます
        </Styledcoment>
        <Styledcoment>
          知らなかった場所や
          <br />
          気になったポイントが見つかれば
          <br />
          ぜひ実際に足を運んでみて下さい
        </Styledcoment>
        <Space>
          <Button
            label="ポイントを見てみる"
            onClick={() => dispatch(push("/prefecturelist"))}
          />
        </Space>
        <Space>
          <Button label="ログアウトする" onClick={() => dispatch(signOut())} />
        </Space>
        <Space>
          <Button
            label="情報編集ページへ行く"
            onClick={() => dispatch(push("/editareapointlist"))}
          />
        </Space>
      </StyledContainer>
    </Section>
  );
};

export default Home;

const Section = styled.section`
  min-height: 100vh;
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
  outline: none;
  cursor: pointer;
  :active {
    opacity: 0.7;
  }
`;

const Space = styled.div`
  margin-bottom: 30px;
`;
