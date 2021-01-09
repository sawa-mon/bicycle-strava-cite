import React, { useState } from "react";
import { googleSignIn, twitterSignIn } from "../reducks/users/operations";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import GoogleIcon from "../assets/Images/google.svg";
import TwitterIcon from "../assets/Images/twitter.svg";
import { Loading } from "../components/UIkit/Loading";
import { Button } from "../components/UIkit/Button";

const SignIn = () => {
  const dispatch = useDispatch();
  const [nonDisplay, setNonDisplay] = useState(false);

  const selectLogin = (id) => {
    switch (id) {
      case "google":
        dispatch(googleSignIn());
        setNonDisplay(true);
        break;
      case "twitter":
        dispatch(twitterSignIn());
        setNonDisplay(true);
        break;
      default:
        break;
    }
  };

  const loginMenus = [
    {
      func: selectLogin,
      label: "Googleアカウントでログイン",
      icon: GoogleIcon,
      id: "google",
      style: {
        backgroundColor: "f5f5f5",
        color: "black",
        fontSize: "15px",
        width: "245px",
        display: "flex",
        placeItems: "center",
        padding: "5px",
        margin: "25px auto 25px auto",
        borderRadius: "5px",
      },
    },
    {
      func: selectLogin,
      label: "Twitterアカウントでログイン",
      icon: TwitterIcon,
      id: "twitter",
      style: {
        backgroundColor: "f5f5f5",
        color: "black",
        fontSize: "15px",
        width: "245px",
        display: "flex",
        placeItems: "center",
        padding: "5px",
        margin: "25px auto 25px auto",
        borderRadius: "5px",
      },
    },
  ];

  return (
    <Section>
      {nonDisplay ? (
        <Loading />
      ) : (
        <>
          <StyledTitle>
            バイクラック設置
            <br />
            ポイント共有サイト
          </StyledTitle>
          <StyledInfo>
            いずれかのSNSアカウントで
            <br />
            ログインして下さい
          </StyledInfo>
          {loginMenus.map((menu) => (
            <StyledButton
              key={menu.id}
              style={menu.style}
              onClick={() => menu.func(menu.id)}
            >
              <StyledLoginIcon src={menu.icon} alt="LoginIcon" />
              {menu.label}
            </StyledButton>
          ))}
        </>
      )}
    </Section>
  );
};

export default SignIn;

const Section = styled.div`
  background: linear-gradient(46deg, #e06218 0%, #354fdc 100%);

  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

const StyledTitle = styled.h2`
  margin: 50px auto 50px auto;
  padding: 25px;
  font-size: 30px;
  display: grid;
  place-items: center;
  text-align: center;
`;

const StyledInfo = styled.h3`
  margin: 30px auto 30px auto;
  text-align: center;
`;

const StyledButton = styled.button`
  outline: none;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;

const StyledLoginIcon = styled.img`
  height: 26px;
  width: 26px;
  margin-right: 5px;
`;
