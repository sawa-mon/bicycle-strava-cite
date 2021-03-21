import React, { useState } from "react";
import Swiper from "react-id-swiper";
import NoImage from "../../assets/Images/no_image.png";
import "swiper/css/swiper.css";
import styled from "styled-components";

export const ImageSwiper = (props) => {
  const [params] = useState({
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
    autoplay: true,
    speed: 700,
    effect: 'fade',
  });

  const images = props.images;

  return (
    <Swiper {...params}>
      {!images.length ? (
        <StyledContainer>
          <StyledWrap>
            <img src={NoImage} alt="no image" />
          </StyledWrap>
        </StyledContainer>
      ) : (
        images.map((image, index) => (
          <StyledContainer key={index}>
            <StyledWrap>
              <img src={image.path} alt="イメージ画像" />
            </StyledWrap>
          </StyledContainer>
        ))
      )}
    </Swiper>
  );
};

const StyledContainer = styled.div`
  position: relative;
  ::before {
    content: "";
    display: block;
    padding-top: calc(9 / 16 * 100%);
  }
`;

const StyledWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  img {
    width: 100%;
    height: auto;
  }
`;
