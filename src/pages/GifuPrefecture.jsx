import React from "react";
import { Button } from "../components/UIkit/Button";
import { GoogleMapsComponent } from "../components/UIkit/GoogleMapsComponent";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { gifuDataset } from "../dataset/gifuDataset";

export const GifuPrefecture = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const sateliteScans = gifuDataset;

  return (
    <div>
      <p>岐阜のラック設置エリア一覧</p>
      <Button label="Home" onClick={() => dispatch(push("/"))} />
      <div>
        {sateliteScans.map((sateliteScan, index) => (
          <GoogleMapsComponent
            key={index}
            info={sateliteScan.info}
            lat={sateliteScan.location.lat}
            lng={sateliteScan.location.lng}
          />
        ))}
      </div>
    </div>
  );
};
