import React, { useCallback, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { PlaceInfo } from "./PlaceInfo";

const libraries = ["places"];

// デフォルトUI（衛星写真オプション）キャンセル
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export const GoogleMapsComponent = (props) => {
  const id = window.location.pathname
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
        mapContainerStyle={{
          height: props.mapContainerStyle.height,
          width: props.mapContainerStyle.width,
        }}
        zoom={props.zoom}
        center={{
          lat: props.lat,
          lng: props.lng,
        }}
        options={options}
        onLoad={onMapLoad}
        onClick={id=="/installationinfoedit(/:id)?" || "/installationinfoedit" && ((e) => {
          props.locationLat(e.latLng.lat())
          props.locationLng(e.latLng.lng())
        })}
      >
        {!props.locationLat && (
          <PlaceInfo info={props.info} lat={props.lat} lng={props.lng} />
        )}
        {props.locationLat && (
          <PlaceInfo lat={props.lat} lng={props.lng} />
        )}
      </GoogleMap>
    </div>
  );
};
