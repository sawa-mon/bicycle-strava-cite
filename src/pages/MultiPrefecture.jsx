import React, { useState } from "react";
import { Button } from "../components/UIkit/Button";
import { GoogleMapsComponent } from "../components/UIkit/GoogleMapsComponent";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { gifuDataset } from "../dataset/gifuDataset";
import { aichiDataset } from "../dataset/aichiDataset";
import { naganoDataset } from "../dataset/naganoDataset";

export const MultiPrefecture = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const [sateliteScans, setSateliteScans] = useState("");
  const [prefectureName, setPrefectureName] = useState("");

  // const locationData = props.location.pathname;
  // switch (locationData) {
  //   case locationData("/gifuprefecture"):
  //     setSateliteScans(gifuDataset);
  //     setPrefectureName("岐阜県");
  //     break;
  //   case locationData("/aichiprefecture"):
  //     setSateliteScans(aichiDataset);
  //     setPrefectureName("愛知県");
  //     break;
  //   case locationData("/naganoprefecture"):
  //     setSateliteScans(naganoDataset);
  //     setPrefectureName("長野県");
  //     break;
  //   case locationData("/mieprefecture"):
  //     setSateliteScans(null);
  //     setPrefectureName("三重県");
  //     break;
  //   default:
  //     break;
  // }

  return (
    <div>
      <p>{prefectureName}のラック設置エリア一覧</p>
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
