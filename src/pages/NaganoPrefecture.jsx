import React from "react";
import { useDispatch } from "react-redux";
import { GoogleMapsComponent } from "../components/UIkit/GoogleMapsComponent";
import { Button } from "../components/UIkit/Button";
import { push } from "connected-react-router";
import { naganoDataset } from "../dataset/naganoDataset";

export const NaganoPrefecture = () => {
  const dispatch = useDispatch();
  const sateliteScans = naganoDataset;

  return (
    <div>
      <p>長野県のラック設置エリア一覧</p>
      <Button label="Home" onClick={() => dispatch(push("/"))} />
      <div>
        {sateliteScans.map((sateliteScan) => (
          <GoogleMapsComponent
            key={sateliteScan.info}
            info={sateliteScan.info}
            lat={sateliteScan.location.lat}
            lng={sateliteScan.location.lng}
          />
        ))}
      </div>
    </div>
  );
};
