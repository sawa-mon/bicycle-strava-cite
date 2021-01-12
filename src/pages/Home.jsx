import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { push } from "connected-react-router";
import { Button, SelectBox } from "../components/UIkit";
import { signOut } from "../reducks/users/operations";

const Home = () => {
  const dispatch = useDispatch();
  const [prefecture, setPrefecture] = useState("");

  const prefectures = [
    { id: "", name: "地域選択" },
    { id: "gifu", name: "岐阜" },
    { id: "aichi", name: "愛知" },
    { id: "nagano", name: "長野" },
    { id: "mie", name: "三重" },
  ];

  const getValue = () => {
    const element = document.getElementById("prefectures");
    const prefectureValue = element.value;
    dispatch(push(`/${prefectureValue}`));
  };

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
          新たな発見を登録ページの投稿機能を使って
          <br />
          コメントを残すこともできます
        </Styledcoment>
        <Styledcoment>
          知らなかった場所や
          <br />
          気になったポイントがあれば
          <br />
          ぜひ実際に足を運んでみて下さい
        </Styledcoment>
        <Styledcoment>エリアから選ぶ</Styledcoment>
        <StyledFrom>
          <label />
          <SelectBox
            home
            id={"prefectures"}
            options={prefectures}
            select={setPrefecture}
            value={prefecture}
          />
          <StyledSubmit
            type="button"
            value="確認する"
            onClick={() => getValue()}
          />
        </StyledFrom>
        <Space>
          <Button label="ログアウトする" onClick={() => dispatch(signOut())} />
        </Space>
        <Space>
          <Button
            label="情報追加ページへ行く"
            onClick={() => dispatch(push("/installationinfoedit"))}
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
