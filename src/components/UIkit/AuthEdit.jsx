import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserName } from "../Redux/User/selector";

const StartChat = ({ children }) => {
  const history = useHistory();
  const selector = useSelector((state) => state);
  const name = getUserName(selector);

  useEffect(() => {
    if (name.length === 0) {
      history.push("/");
    }
  }, []);

  if (name.length === 0) {
    return <></>;
  } else {
    return children;
  }
};
export default StartChat;
