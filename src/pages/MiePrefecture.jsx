import React, { useEffect, useState } from "react";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import styled from "styled-components";

export const MiePrefecture = () => {
  const dispatch = useDispatch();
  const [noneDisplay, setNoneDisplay] = useState(true);
  const [count, setCount] = useState(6);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [count]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNoneDisplay(true);
      dispatch(push("/"));
    }, 6000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div>
      <p>三重県のラック設置エリア一覧</p>
      <h3>
        申し訳ありません。
        <br />
        現在設置ポイント情報がありません。
        <br />
        情報追加まで今しばらくお待ち下さい。
      </h3>
      {noneDisplay && (
        <StyledNoneDisplay>
          {count}秒後にホームへリダイレクトされます。
        </StyledNoneDisplay>
      )}
    </div>
  );
};

const StyledNoneDisplay = styled.h4`
  animation: flash 1.0s linear infinite;
  @keyframes flash {
  50% {
  opacity: 0.3;
}
`;
