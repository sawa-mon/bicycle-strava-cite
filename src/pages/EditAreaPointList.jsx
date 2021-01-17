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

  const mapContainerStyle = {
    height: "250px",
    width: "250px",
  };

  const query = selector.router.location.search;
  const prefecture = /^\?prefecture=/.test(query)
    ? query.split("?prefecture=")[1]
    : "";

  useEffect(() => {
    dispatch(fetchAreaPoints(prefecture));
  }, []);

  return (
    <StyledContainer>
      <h2>編集一覧ページ</h2>
      <StyledSection>
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
                {/* <GoogleMapsComponent
                  info={areapoint.info}
                  lat={areapoint.locationLat}
                  lng={areapoint.locationLng}
                  mapContainerStyle={mapContainerStyle}
                /> */}
              </MapWrap>
            </StyledInfo>
          ))}
      </StyledSection>
    </StyledContainer>
  );
};

const StyledContainer = styled.section`
  display: grid;
  place-items: center;
  margin: 0 auto 0 auto;
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
  margin: 0 0 20px 15px;
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
