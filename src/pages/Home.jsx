import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { push } from "connected-react-router";

const Home = () => {
  const dispatch = useDispatch();

  return (
    <Section>
      <StyledContainer></StyledContainer>
    </Section>
  );
};

export default Home;

const Section = styled.section`
  min-height: 100vh;
  margin: auto;
`;

const StyledContainer = styled.div`
  display: grid;
  place-items: center;
`;

const Space = styled.div`
  margin: 30px;
`;
