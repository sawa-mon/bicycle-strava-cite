import React, { useCallback, useEffect, useState } from "react";
import { getThemeProps, makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { db, FirebaseTimestamp } from "../firebase/index";
import { GoogleMapsComponent, ImageSwiper } from "../components/UIkit";
import styled from "styled-components";
import noImageAvatar from "../assets/Images/noImageAvatar.svg";
import submitIcon from "../assets/Images/submitIcon.svg";
import { getUserIcon, getUserName } from "../reducks/users/selectors";
import { addCommentToDB } from "../reducks/areapoints/operation";
import { getInputComment } from "../reducks/areapoints/selector";

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
}));

export const AreaPointDetail = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const path = selector.router.location.pathname;
  const userName = getUserName(selector);
  const userIcon = getUserIcon(selector);
  const id = path.split("/areapoint/")[1];

  const mapContainerStyle = {
    height: "320px",
    width: "320px",
  };

  const [areapoint, setAreapoint] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    db.collection("areapoints")
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
        setAreapoint(data);
      });
  }, []);

  // const addInputComment = () => {
  //   const timestamp = FirebaseTimestamp.now();
  //   const data = {
  //     id: id,
  //     added_at: timestamp,
  //     comment: comment,
  //     usename: userName,
  //     icon: userIcon,
  //   };
  //   db.collection("areapoints").doc(id).collection("comments").add(data);
  //   setComment("");
  //   console.log(data);
  // };

  return (
    <StyledSection>
      {areapoint && (
        <div>
          <StyledGrid>
            <div className={classes.sliderBox}>
              <ImageSwiper images={areapoint.images} />
            </div>
            <div className={classes.detail}>
              <StyledTitle>
                <h2>ラック設置ポイント</h2>
                <p>{areapoint.installation}</p>
                <h2>ラックの詳細位置</h2>
                <p>{areapoint.info}</p>
              </StyledTitle>
            </div>
          </StyledGrid>
          <StyledMapAndComent>
            <Wrap>
              <StyledTitle>
                <h2>このエリアに関する投稿コメント</h2>
                <p>ご自由にコメントを入力して下さい</p>
                {/* <textarea
                  placeholder="このポイント付近のパン屋さん美味しいよ"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  cols={20}
                  rows={2}
                />
                <StyledSubmitButton
                  type="button"
                  onClick={() => addInputComment()}
                >
                  <img src={submitIcon} alt="bytton-icon" />
                </StyledSubmitButton> */}
              </StyledTitle>
            </Wrap>
            <Wrap>
              <StyledGoogleMap>
                <h2>GooleMap</h2>
                <StyledText>ラック設置ポイントの投稿者</StyledText>
                <StyledAreaWrap>
                  <StyledIcon
                    src={areapoint.icon ? areapoint.icon : noImageAvatar}
                  />
                  <StyledText>
                    {areapoint.username ? areapoint.username : "UnknownUser"}
                  </StyledText>
                </StyledAreaWrap>
              </StyledGoogleMap>
              <GoogleMapsComponent
                info={areapoint.info}
                lat={areapoint.locationLat}
                lng={areapoint.locationLng}
                mapContainerStyle={mapContainerStyle}
              />
            </Wrap>
          </StyledMapAndComent>
        </div>
      )}
    </StyledSection>
  );
};

const StyledSection = styled.div`
  min-height: 100vh;
  margin-top: 10px;
`;

const StyledGrid = styled.div`
  display: flex;
  flex-flow: row wrap;
  height: auto;
  max-width: 1024px;
  margin: 0 auto;
`;

const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    font-weight: normal;
    font-style: oblique;
    font-size: 23px;
    margin: 5px 10px 5px 10px;
  }
  p {
    font-weight: normal;
    font-style: oblique;
    margin: 5px 10px 25px 10px;
  }
`;

const StyledGoogleMap = styled.div`
  h2 {
    font-size: 30px;
    font-weight: normal;
    font-style: oblique;
    margin-top: 30px;
  }
  @media screen and (min-width: 600px) {
    margin-top: -60px;
  }
  @media screen and (min-width: 800px) {
    margin-top: 10px;
  }
`;

const Wrap = styled.div`
  display: grid;
  place-items: center;
  margin: 0 auto;
`;

const StyledIcon = styled.img`
  margin: 10px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border-style: groove;
  border-color: #deff00f7;
  background: linear-gradient(46deg, #e06218 0%, #354fdc 100%);
`;

const StyledAreaWrap = styled.div`
  display: flex;
`;

const StyledText = styled.p`
  display: grid;
  place-items: center;
  margin: 0;
  font-weight: normal;
  font-style: oblique;
`;

const StyledMapAndComent = styled.div`
  display: flex;
`;

const StyledSubmitButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background: orange;
  border: none;
  outline: none;
  :hover {
    opacity: 0.7;
  }
`;
