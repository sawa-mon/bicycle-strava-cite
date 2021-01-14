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
  });

  const images = props.images;

  return (
    <Swiper {...params}>
      <StyledContainer>
        {images.length === 0 ? (
          <StyledWrap>
            <img src={NoImage} alt="no image" />
          </StyledWrap>
        ) : (
          images.map((image) => (
            <StyledWrap>
              <img src={image.path} alt="商品画像" />
            </StyledWrap>
          ))
        )}
      </StyledContainer>
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
  position: absolute; /* ← swiper.cssと優先順位が干渉するときは工夫してください */
  top: 0;
  left: 0;
  img {
    width: 100%;
    height: auto;
  }
`;
