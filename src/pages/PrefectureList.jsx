import React, { useEffect } from "react";
import { Button } from "../components/UIkit/index";
import { GoogleMapsComponent } from "../components/UIkit/index";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getAreaPoints } from "../reducks/areapoints/selector";
import { fetchAreaPoints } from "../reducks/areapoints/operation";

export const PrefectureList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const areapoints = getAreaPoints(selector);

  useEffect(() => {
    dispatch(fetchAreaPoints());
  }, []);

  return (
    <StyledSection>
      <h2>岐阜県のラック設置エリア一覧</h2>
      <Button label="Home" onClick={() => dispatch(push("/"))} />
      {areapoints.map((areapoint, index) => (
        <StyledInfo key={index}>
          <StyledTitle>
            <strong>ラック設置エリア</strong>
            <br />
            {areapoint.installation}
          </StyledTitle>
          <MapWrap>
            <GoogleMapsComponent
              info={areapoint.info}
              lat={areapoint.locationLat}
              lng={areapoint.locationLng}
            />
            <CommentWrap>
              <Button
                plane
                label="投稿されたコメントを見る"
                onClick={() => dispatch(push("/"))}
              />
            </CommentWrap>
          </MapWrap>
        </StyledInfo>
      ))}
    </StyledSection>
  );
};

const StyledSection = styled.section`
  display: grid;
  place-items: center;
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
