import { InfoWindow, Marker } from "@react-google-maps/api";
import React, { useState } from "react";

export const PlaceInfo = (props) => {
  const places = [
    {
      info: props.info,
      location: { lat: props.lat, lng: props.lng },
    },
  ];

  const [selected, setSelected] = useState(null);

  return (
    <div>
      {places.map((place) => (
        <Marker
          key={`${place.location.lat * place.location.lng}`}
          position={{
            lat: place.location.lat,
            lng: place.location.lng,
          }}
          onMouseOver={() => {
            setSelected(place);
          }}
        />
      ))}

      {selected ? (
        <InfoWindow
          position={{
            lat: selected.location.lat + 0.00075,
            lng: selected.location.lng,
          }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div>{selected.info}</div>
        </InfoWindow>
      ) : null}
    </div>
  );
};
