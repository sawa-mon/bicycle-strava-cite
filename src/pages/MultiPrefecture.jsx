import React, { useState } from "react";
import { Button } from "../components/UIkit/Button";
import { GoogleMapsComponent } from "../components/UIkit/GoogleMapsComponent";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { gifuDataset } from "../dataset/gifuDataset";
import { aichiDataset } from "../dataset/aichiDataset";
import { naganoDataset } from "../dataset/naganoDataset";

export const MultiPrefecture = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const sateliteScans = gifuDataset;

  return (
    <StyledSection>
      <h2>のラック設置エリア一覧</h2>
      <Button label="Home" onClick={() => dispatch(push("/"))} />
      <Wrap>
        {sateliteScans.map((sateliteScan, index) => (
          <StyledInfo key={index}>
            <h3>
              <strong>ラック設置エリア</strong>
              <br />
              {sateliteScan.installation}
            </h3>
            <MapWrap>
              <GoogleMapsComponent
                info={sateliteScan.info}
                lat={sateliteScan.location.lat}
                lng={sateliteScan.location.lng}
              />
              <CommentWrap>
                <Button plane label="投稿されたコメントを見る" />
              </CommentWrap>
            </MapWrap>
          </StyledInfo>
        ))}
      </Wrap>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  display: grid;
  place-items: center;
`;

const Wrap = styled.div``;

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
