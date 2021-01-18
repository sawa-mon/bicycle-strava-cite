import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, SelectBox } from "../components/UIkit";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { saveAddPoint } from "../reducks/areapoints/operation";
import { AddImage } from "../components/UIkit";
import { db } from "../firebase";

export const InstallationInfoEdit = () => {
  const dispatch = useDispatch();
  let id = window.location.pathname.split("/installationinfoedit")[1];

  if (id !== "") {
    id = id.split("/")[1];
  }

  const [info, setInfo] = useState("");
  const [installation, setInstallation] = useState("");
  const [images, setImages] = useState([]);
  const [locationLat, setLocationLat] = useState("");
  const [locationLng, setLocationLng] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [prefectures, setPrefectures] = useState([]);
  const [latCheck, setLatCheck] = useState(false);

  const inputInsatallation = useCallback(
    (event) => {
      setInstallation(event.target.value);
    },
    [setInstallation]
  );

  const inputInfo = useCallback(
    (event) => {
      setInfo(event.target.value);
    },
    [setInfo]
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

  // /編集ページにおけるデータベースからのデータ取得
  useEffect(async () => {
    if (id !== "") {
      await db
        .collection("areapoints")
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          setInfo(data.info);
          setInstallation(data.installation);
          setImages(data.images);
          setLocationLat(data.locationLat);
          setLocationLng(data.locationLng);
          setPrefecture(data.prefecture);
        });
    }
  }, [id]);

  useEffect(() => {
    db.collection("prefectures")
      .orderBy("number", "asc")
      .get()
      .then((snapshots) => {
        const list = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push({
            id: data.id,
            name: data.name,
          });
        });
        setPrefectures(list);
      });
  }, []);

  return (
    <StyledSection>
      <h2>ラックポイント登録・編集</h2>
      <StyledDiv>
        <AddImage images={images} setImages={setImages} />
        <StyledInput
          onChange={inputInsatallation}
          type="text"
          placeholder="バイクラックの場所概要：道の駅〇〇"
          value={installation}
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
          min={20}
          max={46}
          step={0.00001}
        />
        <StyledInput
          onChange={inputLocationLng}
          type="number"
          placeholder="緯度：137.13713"
          value={locationLng}
          min={122}
          max={154}
          step={0.00001}
        />
        <SelectBox
          options={prefectures}
          select={setPrefecture}
          value={prefecture}
        />
        <Wrap>
          {info && installation && locationLat && locationLng && prefecture ? (
            <Button
              type="submit"
              label="この内容で登録する"
              onClick={() =>
                dispatch(
                  saveAddPoint(
                    id,
                    info,
                    images,
                    installation,
                    locationLat,
                    locationLng,
                    prefecture
                  )
                )
              }
            />
          ) : (
            <Button plane label="未入力項目入力があります" />
          )}
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

const StyledDiv = styled.form`
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
