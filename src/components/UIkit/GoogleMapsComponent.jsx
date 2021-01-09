import React, { useCallback, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { PlaceInfo } from "./PlaceInfo";

// 地図のサイズの指定
const libraries = ["places"];
const mapContainerStyle = {
  height: "250px",
  width: "250px",
};

// デフォルトUI（衛星写真オプション）キャンセル
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export const GoogleMapsComponent = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries,
  });

  //再レンダー防止措置
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={{
          lat: props.lat,
          lng: props.lng,
        }}
        options={options}
        onLoad={onMapLoad}
      >
        <PlaceInfo info={props.info} lat={props.lat} lng={props.lng} />
      </GoogleMap>
    </div>
  );
};
