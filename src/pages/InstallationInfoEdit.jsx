import React, { useCallback, useState } from "react";
import { Button, SelectBox } from "../components/UIkit";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { saveAddPoint } from "../reducks/areapoints/operation";
import { AddImage } from "../components/UIkit";

export const InstallationInfoEdit = () => {
  const dispatch = useDispatch();

  const [info, setInfo] = useState("");
  const [insatallation, setInsatallation] = useState("");
  const [images, setImages] = useState([]);
  const [locationLat, setLocationLat] = useState("");
  const [locationLng, setLocationLng] = useState("");
  const [prefecture, setPrefecture] = useState("");

  const inputInfo = useCallback(
    (event) => {
      setInfo(event.target.value);
    },
    [setInfo]
  );

  const inputInsatallation = useCallback(
    (event) => {
      setInsatallation(event.target.value);
    },
    [setInsatallation]
  );

  const inputLocationLat = useCallback(
    (event) => {
      setLocationLat(event.target.value);
    },
    [setLocationLat]
  );

  const inputLocationLng = useCallback(
    (event) => {
      setLocationLng(event.target.value);
    },
    [setLocationLng]
  );

  const prefectures = [
    { id: "", name: "地域選択" },
    { id: "gifu", name: "岐阜" },
    { id: "aichi", name: "愛知" },
    { id: "nagano", name: "長野" },
    { id: "mie", name: "三重" },
  ];

  return (
    <StyledSection>
      <h2>ラックポイント登録・編集</h2>
      <StyledDiv>
        <AddImage images={images} setImages={setImages} />
        <StyledInput
          onChange={inputInsatallation}
          type="text"
          placeholder="バイクラックの場所概要：道の駅〇〇"
          value={insatallation}
        />
        <StyledInput
          onChange={inputInfo}
          type="text"
          placeholder="地図内表示される位置コメント：位置は〇〇です"
          value={info}
        />
        <StyledInput
          onChange={inputLocationLat}
          type="number"
          placeholder="経度：34.343434"
          value={locationLat}
          min={0}
        />
        <StyledInput
          onChange={inputLocationLng}
          type="number"
          placeholder="緯度：137.13713"
          value={locationLng}
          min={0}
          step={0.00001}
        />
        <SelectBox
          options={prefectures}
          select={setPrefecture}
          value={prefecture}
        />
        <Wrap>
          <Button
            label="この内容で登録する"
            onClick={() =>
              dispatch(
                saveAddPoint(
                  info,
                  images,
                  insatallation,
                  locationLat,
                  locationLng,
                  prefecture
                )
              )
            }
          />
        </Wrap>
      </StyledDiv>
    </StyledSection>
  );
};

const StyledInput = styled.input`
  width: 300px;
  height: 40px;
  margin-bottom: 40px;
`;

const StyledDiv = styled.div`
  display: grid;
  place-items: center;
`;

const StyledSection = styled.section`
  display: grid;
  place-items: center;
  margin: 0 auto;
`;

const Wrap = styled.div`
  margin: 30px;
`;
