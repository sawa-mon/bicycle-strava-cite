import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Button, ImageSwiper } from "../components/UIkit/index";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getAreaPoints } from "../reducks/areapoints/selector";
import { fetchAreaPoints } from "../reducks/areapoints/operation";

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      height: 200,
      width: 300,
      outLine: "none",
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      height: 200,
      width: 300,
      outLine: "none",
    },
  },
}));

export const PrefectureList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const areapoints = getAreaPoints(selector);

  //selectorがURLに関する値を持っているのでそれを取得
  const query = selector.router.location.search;
  // クエリパラメータ /^\先頭が ?prefecture=から始まる queryを.testメソッドで検証し trueの場合split()[1]とし、?以降の値を取り出す
  const prefecture = /^\?prefecture=/.test(query)
    ? query.split("?prefecture=")[1]
    : "";

  useEffect(() => {
    dispatch(fetchAreaPoints(prefecture));
  }, [query]);

  return (
    <StyledContainer>
      <h2>バイクラック設置エリア一覧</h2>
      {areapoints.length > 0 ? (
        <StyledSection>
          {areapoints.map((areapoint, index) => (
            <StyledInfo key={index}>
              <StyledTitle>
                <strong>ラック設置エリア</strong>
                <br />
                {areapoint.installation}
              </StyledTitle>
              <MapWrap>
                <div className={classes.sliderBox}>
                  <ImageSwiper images={areapoint.images} />
                </div>
                <CommentWrap>
                  <Button
                    plane
                    label="詳細情報を見る"
                    onClick={() => dispatch(push("/areapoint/" + areapoint.id))}
                  />
                </CommentWrap>
              </MapWrap>
            </StyledInfo>
          ))}
        </StyledSection>
      ) : (
        <StyledContainer>
          <StyledErrorComent>
            申し訳ありませんが、現在このエリアの情報はありません
          </StyledErrorComent>
        </StyledContainer>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.section`
  display: grid;
  place-items: center;
  margin: 0 auto 0 auto;
`;

const StyledErrorComent = styled.h2`
  margin: 20px;
`;

const StyledSection = styled.div`
  display: grid;
  place-items: center;
  @media screen and (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: 1040px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const StyledTitle = styled.div`
  margin: 20px 0 20px 15px;
`;

const CommentWrap = styled.div`
  padding: 10px 10px 0 10px;
`;

const StyledInfo = styled.div`
  border: 2px;
  border-radius: 5px;
  width: 320px;
  border-style: groove;
  margin: 10px;
  h3 {
    padding: 5px;
  }
`;

const MapWrap = styled.div`
  display: grid;
  place-items: center;
  margin: 10px;
`;
