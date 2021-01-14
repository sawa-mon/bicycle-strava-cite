import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";
import { db } from "../firebase/index";
import { GoogleMapsComponent, ImageSwiper } from "../components/UIkit";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down("sm")]: {
      margin: "5px auto 10px auto",
      height: 200,
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "15px auto 0 auto",
      height: 250,
      width: 400,
    },
  },
  detail: {
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      margin: "5px auto 10px auto",
      height: 200,
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "15px auto 0 auto",
      height: 250,
      width: 400,
    },
  },
  autoHeight: true,
}));

export const AreaPointDetail = () => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const path = selector.router.location.pathname;
  const id = path.split("/areapoint/")[1];

  const [areapoint, setAreapoint] = useState(null);

  useEffect(() => {
    db.collection("areapoints")
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
        setAreapoint(data);
      });
  }, []);

  return (
    <StyledSection>
      {areapoint && (
        <div>
          <StyledGrid>
            <div className={classes.sliderBox}>
              <ImageSwiper images={areapoint.images} />
            </div>
            <div className={classes.detail}>
              <h2>ラック設置ポイント名称：{areapoint.installation}</h2>
            </div>
          </StyledGrid>
          <GoogleMapsComponent
            info={areapoint.info}
            lat={areapoint.locationLat}
            lng={areapoint.locationLng}
          />
        </div>
      )}
    </StyledSection>
  );
};

const StyledSection = styled.div`
  min-height: 100vh;
`;

const StyledGrid = styled.div`
  position: relative;
  /* z-index: -1; */
  display: flex;
  flex-flow: row wrap;
  height: 400px;
`;
