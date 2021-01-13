import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, EditButton, GoogleMapsComponent } from "../components/UIkit";
import { fetchAreaPoints } from "../reducks/areapoints/operation";
import { getAreaPoints } from "../reducks/areapoints/selector";
import styled from "styled-components";
import { push } from "connected-react-router";

export const EditAreaPointList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const areapoints = getAreaPoints(selector);

  useEffect(() => {
    dispatch(fetchAreaPoints());
  }, []);

  return (
    <StyledSection>
      <h2>編集一覧ページ</h2>
      <Button label="Home" onClick={() => dispatch(push("/"))} />
      {areapoints.length > 0 &&
        areapoints.map((areapoint, index) => (
          <StyledInfo key={index}>
            <EditButton id={areapoint.id} />
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
  margin: 0 0 20px 15px;
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
