import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GoogleMapsComponent } from "../components/UIkit/index";
import { Button } from "../components/UIkit/index";
import { push } from "connected-react-router";
import styled from "styled-components";
import { db } from "../firebase";

export const AichiPrefecture = () => {
  const dispatch = useDispatch();
  const [sateliteScans, setSateliteScans] = useState([]);

  useEffect(() => {
    const unSub = db
      .collection("areapoints")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setSateliteScans(
          snapshot.docs.map((doc) => ({
            key: doc,
            info: doc.data().info,
            installation: doc.data().installation,
            locationLat: doc.data().locationLat,
            locationLng: doc.data().locationLng,
            prefecture: doc.data().prefecture,
          }))
        )
      );
    return () => {
      unSub();
    };
  }, []);

  return (
    <StyledSection>
      <h2>愛知県のラック設置エリア一覧</h2>
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
                lat={sateliteScan.locationLat}
                lng={sateliteScan.locationLng}
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
