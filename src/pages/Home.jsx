import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { push } from "connected-react-router";
import { Button } from "../components/UIkit/Button";
import { signOut } from "../reducks/users/operations";

const Home = () => {
  const dispatch = useDispatch();

  //ここは最終的にデータベース参照で最終的にmapでまわす
  const prefectureMenus = [
    {
      name: "地域選択",
      prefecture: "",
    },
    {
      name: "長野県",
      prefecture: "naganoprefecture",
    },
    {
      name: "愛知県",
      prefecture: "aichiprefecture",
    },
    {
      name: "岐阜県",
      prefecture: "gifuprefecture",
    },
    {
      name: "三重県",
      prefecture: "mieprefecture",
    },
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
          <StyledSelect id="prefectures">
            {prefectureMenus.map((prefectureMenu, index) => (
              <option key={index} value={prefectureMenu.prefecture}>
                {prefectureMenu.name}
              </option>
            ))}
          </StyledSelect>
          <StyledSubmit
            type="button"
            value="確認する"
            onClick={() => getValue()}
          />
        </StyledFrom>
        <Space>
          <Button label="ログアウトする" onClick={() => dispatch(signOut())} />
        </Space>
      </StyledContainer>
    </Section>
  );
};

export default Home;

const Section = styled.div`
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
  outline: none;
  cursor: pointer;
  :active {
    opacity: 0.7;
  }
`;

const Space = styled.div`
  margin-bottom: 30px;
`;
